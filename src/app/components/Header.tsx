import Link from 'next/link'
import React from 'react'
import LoginBtn from './LoginBtn'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export default async function Header() {
    //로그인한 정보 가져오기 - 서버컴포넌트와 서버기능안에서 사용가능
    // await getServerSession(authOptions) // async awit 방식으로 써야한다. 
    let session = await getServerSession(authOptions) // async awit 방식으로 써야한다.
  return (
    <header>
        <LoginBtn />
        <div className="navbar">
            <div className='flex items-center place-content-between'>
                <h1>
                    <Link href="/" className="logo">SunnyBoard</Link>
                </h1>
                <div>
                    <Link href="/list">List</Link>
                    {
                        session? <Link href="/write">Write</Link>
                        : null
                    }
                </div>
            </div>
        </div>
    </header>
  )
}
