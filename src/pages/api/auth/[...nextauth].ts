import {connectDB} from "@/util/database"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

const gitId = `${process.env.NEXT_PUBLIC_AUTH_ID}`
const gitPw = `${process.env.NEXT_PUBLIC_AUTH_PW}`
const jwtPw = `${process.env.NEXT_PUBLIC_JWT_PW}`

export const authOptions: NextAuthOptions  = {
  providers: [ // 로그인 구현방식
    GithubProvider({
      clientId: gitId, // 깃허브에서 받은 id
      clientSecret: gitPw, // 깃허브에서 받은 씨크릿
    }),
    // 구글이 있다면 구글Provider을 찾아서 추가하면 된다.
    // 소셜로그인 말고 일반 로그인을 하고 싶다면
    // CredentialsProvider() //jwt만 사용가능
    CredentialsProvider({
        //1. 로그인페이지 폼 자동생성해주는 코드 
        name: "credentials",
          credentials: {
            // 로그인페이지에 들어갈 input들
            email: { label: "email", type: "text" },
            password: { label: "password", type: "password" },
            // name: { label: "name", type: "text" },  이렇게 추가도 가능
        },
  
        //2. 로그인요청시 실행되는코드
        //직접 DB에서 아이디,비번 비교하고 
        //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
        async authorize(credentials: any) {
          let db = (await connectDB).db('forum');
          let user = await db.collection('join').findOne({email : credentials.email})
          if (!user) {
            console.log('해당 이메일은 없음');
            return null
          }
          const pwcheck = await bcrypt.compare(credentials.password, user.password);
          if (!pwcheck) {
            console.log('비번틀림');
            return null
          }
          return user
        }
    })
  ],
  // CredentialsProvider에서 jwt만 사용가능하므로 아래 코드 추가
   //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
   session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 //30일 동안 로그인 유지 - 1일경우: 24 * 60 * 60 - 쿠키에서 확인가능
  },

  callbacks: {
    //4. jwt 만들 때 실행되는 코드 
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    jwt: async ({ token, user }: any) => {
      if (user) {
        token.user = {};
        token.user.name = user.name
        token.user.email = user.email
        // 권한을 추가 할 수 있다
        token.user.role = user.role
        // 어드민 추가
      }
    //   let db = (await connectDB).db('forum');
    //   let data = await db.collection('users').updateOne(
    //     { email: user.email},
    //     { $set : {role: 'normal'}}
    //   )
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token }: any) => {
      session.user = token.user;  
      return session;
    },
  },

  secret : jwtPw, //소셜로그인은 기본적으로 JWT방식이 기본이라서 secret : 란에 JWT생성용 암호 맘대로 길게 입력하면 됩니다. 
  // session 방식으로 회원기능 만들기
  adapter: MongoDBAdapter(connectDB),
};
export default NextAuth(authOptions); 


// 코드작성
// https://authjs.dev/ 페이지 참조

/*
    jwt를 이용하면 고객의 정보 유효기간이 들어있는대 이 유효기간을 길게하면
    누군가 해킹했을경우 그 기간동안 대응할 수가 없다.
    따라서 보통 30분정도 유지하며 그 유효기간이 지나면 새로운 jwt로 자동 발급하는 경우가 많다.

    처음 가지고 있는 token을 access token 이라고 하며 재발급용 token을 refresh token 이라고 한다.
    이때 서버에서는 다른 ip에서 refresh token이 제출되거나 사용했던 refresh token를 또사용 하는 유저를 감지한다.
    jwt는 세션보다 db 조회가 적다는 이점이 있다. refresh token 사용할 때만 DB 조회하면 되기 때문이다.

*/