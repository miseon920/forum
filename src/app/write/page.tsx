'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {useSession} from 'next-auth/react'

export default function Write() {
    const { data: session } = useSession();
    const router = useRouter()

    useEffect(()=>{ 
        if (!session) {
            alert('회원만 글쓰기가 가능합니다.');
            router.push(`/`);
        }
    },[])
  return (
    <div className='write p-20'>
        <form action="/api/write" method='POST'>
            <h4>글쓰기</h4>
            {/*action에 url인 /api/api 주소로 요청 보냄, form은 get과 post만 쓸 수 있음 */}
            <input type="text" name='title' placeholder='글제목' />
            <textarea name='content' placeholder='글내용'></textarea>
            <button type='submit'>확인</button>
        </form>
    </div>
  )
}
