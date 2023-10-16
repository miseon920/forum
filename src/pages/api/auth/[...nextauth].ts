import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const gitId:string = `${process.env.NEXT_PUBLIC_AUTH_ID}`
const gitPw:string = `${process.env.NEXT_PUBLIC_AUTH_PW}`
const jwtPw:string = `${process.env.NEXT_PUBLIC_JWT_PW}`

export const authOptions = {
  providers: [ // 로그인 구현방식
    GithubProvider({
      clientId: gitId, // 깃허브에서 받은 id
      clientSecret: gitPw, // 깃허브에서 받은 씨크릿
    }),
    // 구글이 있다면 구글Provider을 찾아서 추가하면 된다.
  ],
  secret : jwtPw //소셜로그인은 기본적으로 JWT방식이 기본이라서 secret : 란에 JWT생성용 암호 맘대로 길게 입력하면 됩니다. 
};
export default NextAuth(authOptions); 


// 코드작성