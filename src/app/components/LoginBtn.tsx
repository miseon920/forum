'use client';

import React from 'react'
import { signIn, signOut } from 'next-auth/react'

export default function LoginBtn({session}: any) {
  return (
    <>
        {
            session? 
            <span>{session.user.name}<button onClick={()=>{ signOut() }}>로그아웃</button></span>
            :<button onClick={()=>{ signIn() }}>로그인</button>
        }
    </>
  )
}
