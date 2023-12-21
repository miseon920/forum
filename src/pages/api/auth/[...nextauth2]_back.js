import {connectDB} from "@/util/database"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import axios from "axios" //npm install axios

const gitId = `${process.env.NEXT_PUBLIC_TOKEN_ID}`
const gitPw = `${process.env.NEXT_PUBLIC_TOKEN_PW}`
const jwtPw = `${process.env.NEXT_PUBLIC_JWT_PW}`

export const authOptions = {
    providers: [
      GithubProvider({
        clientId: gitId,
        clientSecret: gitPw,
      }),
    ],
  
    //기간설정은 무시됨, github은 access token 유효기간 8시간, refresh token 유효기간 6개월 
    jwt : {
      maxAge: 60,
    },
    callbacks: {
      // JWT 사용할 때마다 실행됨, return 오른쪽에 뭐 적으면 그걸 JWT로 만들어서 유저에게 보내줌
      async jwt({ token, account, user }) {
        console.log('account', account);
        console.log('user', user);
        console.log('token', token);
  
        // 1. 첫 JWT 토큰 만들어주기 (첫 로그인시에만 실행)
        if (account && user) {
          return {
            accessToken: account.access_token,
            refreshToken: account.refresh_token, 
            accessTokenExpires: account.expires_at,
            user,
          }
        }
  
        // 2. 남은 시간이 임박한 경우 access token 재발급하기 
        // 지금은 개발중이라 8시간 - 10초 남았을 때 재발급중
        let remainTime = token.accessTokenExpires - Math.round(Date.now() / 1000)
        if (remainTime < (60 * 60 * 8 - 10) ) {  
          console.log('유효기간 얼마안남음')
          let newJWT = await refreshAccessToken(token) // 3. 깃헙에게 재발급해달라고 조르기 
          console.log('새로운 JWT : ', newJWT)
          return newJWT
        } else {
          return token
        }
      },
  
      //getServerSession 실행시 토큰에 있던 어떤 정보 뽑아서 컴포넌트로 보내줄지 결정가능 
      async session({ session, token }) {
        session.user = token.user
        session.accessToken = token.accessToken
        session.accessTokenExpires = token.accessTokenExpires
        session.error = token.error
        return session
      },
    },
    secret : jwtPw
}
async function refreshAccessToken(token) {
    //1. access token 재발급해달라고 POST요청
    const url = 'https://github.com/login/oauth/access_token'
    const params = {
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken,
      client_id: gitId,
      client_secret: gitPw,
    }

    //  재발급 해달라구 요청하기 토큰은 axios로 post요청을 함
    const res = await axios.post(url, null, { params : params })
    const refreshedTokens = await res.data  // access token, refresh token, 유효기간
    if (res.status !== 200) {
      console.log('실패', refreshedTokens)
    }

    //2. 재발급한거 출력해보기 
    console.log('토큰 재발급한거 : ')
    console.log(refreshedTokens)
    // access_token=ghu_8afeApnRAkzkBYDmshCKqq6uyKJunA1EScAS
    // &expires_in=28800
    // &refresh_token=ghr_IZNb9vbPyu8FnSpnP1fLP0DQPq1EVH2JLB6HMOjgBaeGbZSo3dHJihM46QM5cX1odrOUYe1OhZxc
    // &refresh_token_expires_in=15811200
    // &scope=
    // &token_type=bearer   

    //3. 이걸로 새로운 토큰 만들어서 return 해주기 
    let data = new URLSearchParams(refreshedTokens); //query string 형태의 자료를 뽑기 쉽게 만들려면 new URLSearchParams 안에 넣고 .get() 으로 뽑아야함
    if (data.get('error') == null){
      return {
        ...token,
        accessToken: data.get('access_token'),
        accessTokenExpires:
          Math.round(Date.now() / 1000) + Number(data.get('expires_in')),
        refreshToken: data.get('refresh_token')
      }
    } else {
      return token
    }
} 
  export default NextAuth(authOptions) 

  /*
  유저가 뭐 할 때 마다 JWT를 까보는데 유효기간이 얼마 안남았으면 재발급해오는 코드
1. 이제 로그인하는 경우 accessToken, refreshToken, expires_at (유효기간) 이런 정보들도 깃헙이 보내주는데 
처음 JWT 만들어줄 때 accessToken, refreshToken, expires_at 이런거 넣어서 JWT를 만들어줍니다. 

2. JWT 사용할 때 마다 jwt(){} 안의 코드가 실행되는데 JWT의 유효기간이 얼마 남았는지 측정해봄

3. 유효기간이 임박한 경우 Github에 재발급요청하면 됩니다.  근데 재발급요청 코드는 길어질거같으니 refreshAccessToken() 이라는 함수로 만들어서 넣어봅시다.

그리고 참고로 async jwt(){ } 에서 return한 데이터는 자동으로 JWT로 만들어주고 유저에게 보내줍니다. 

- 현재 auth.js 버전에서 갱신 이슈가 있어서 추후 확인 해야함
https://auth-docs-git-feat-nextjs-auth-authjs.vercel.app/guides/basics/refresh-token-rotation

*/