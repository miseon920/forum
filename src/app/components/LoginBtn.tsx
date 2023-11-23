'use client';

import React from 'react'
import { signIn, signOut, useSession} from 'next-auth/react'

export default function LoginBtn() {  //{session}: any  - props 제거 해보기 - 전체적으로 쓸것으로 정의했기 때문
    
  //세션 상태 사용하기
  const { data: session, status } = useSession();
  // status 는 인증 했는지 안했는지
  // 인증햇을경우  status === "authenticated"
  /*
 1. data:session 값 
    1) data세션을 아직 가져 오지 않은 경우undefined
    2) data세션을 검색 하지 못한 경우null
    3) 성공할 경우 data가 됩니다 Session.
  2. status의 값 
   "loading" | "authenticated" | "unauthenticated"
  */
  return (
    <>
        {
            session? 
            <span>{session.user?.name}<button onClick={()=>{ signOut() }}>로그아웃</button></span>
            :<button onClick={()=>{ signIn() }}>로그인</button>
        }
    </>
  )
}


/**
 * ...로그인 버튼
<button onClick={() => signIn()}>
Sign In
</button>
...

...로그아웃 버튼
<button onClick={() => signOut()}>
Sign Out
</button>
...
 * 
 * 
 * 
 * 
 */