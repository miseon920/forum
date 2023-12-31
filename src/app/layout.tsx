import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'
import AuthSession from "./components/AuthSession";
//서버 컴포넌트에서 쿠키 읽기
import { cookies } from 'next/headers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sunny Board',
  description: 'nextjs 13으로 만든 게시판',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode,
}) {

    //cookies(); // 모튼쿠키 가져옴
    let cookie = cookies().get('displayCookie'); // get안에 쿠키이름적기
    // console.error(cookie, '쿠키이름내놔'); // { name: 'displayCookie', value: 'light' }

  return (
    <html lang="en">
      <body className={`${inter.className} text-center ${cookie?.value}`}>
        <AuthSession>
            <Header />
            {children}
            <Footer />
        </AuthSession>
    </body>
    </html>
  )
}


/*
    전체적으로 썻기 때문에 이제 next-auth에 있는 signIn, signOut등  'use client' 에서 메서드를 호출하면 된다.
    useSession은 서버클라이언트에서 사용불가능, 클라이언트 서버에서만 사용 가능
    https://next-auth.js.org/getting-started/client#usesession

    참고👀 : https://velog.io/@s_soo100/Next.js-13Next.js-13.2%EB%B2%84%EC%A0%BC%EC%97%90-Next-auth-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
*/