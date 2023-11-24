import {connectDB} from "@/util/database"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const gitId = `${process.env.NEXT_PUBLIC_AUTH_ID}`
const gitPw = `${process.env.NEXT_PUBLIC_AUTH_PW}`
const jwtPw = `${process.env.NEXT_PUBLIC_JWT_PW}`

export const authOptions = {
  providers: [ // 로그인 구현방식
    GithubProvider({
      clientId: gitId, // 깃허브에서 받은 id
      clientSecret: gitPw, // 깃허브에서 받은 씨크릿
    }),
    // 구글이 있다면 구글Provider을 찾아서 추가하면 된다.
    // 소셜로그인 말고 일반 로그인을 하고 싶다면
    // CredentialsProvider() //jwt만 사용가능
  ],
  secret : jwtPw, //소셜로그인은 기본적으로 JWT방식이 기본이라서 secret : 란에 JWT생성용 암호 맘대로 길게 입력하면 됩니다. 
  // session 방식으로 회원기능 만들기
  adapter: MongoDBAdapter(connectDB),
};
export default NextAuth(authOptions); 


// 코드작성
// https://authjs.dev/ 페이지 참조