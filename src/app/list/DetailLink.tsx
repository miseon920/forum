'use client'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation' // next/router가 아니라 next/navigation 임
import React from 'react'

export default function DetailLink() {
    // useRouter를 이용하여 이동시키기 - 리액트 훅이므로 client 컴포넌트 안에서만 사용가능
    let router = useRouter();
    let pathName = usePathname(); // 현재 url 출력
    let searchParams = useSearchParams(); // 쿼리 스트링 출력
    let dynamicRoute = useParams(); // 유저가 입력한 다이나믹한 값 출력
    /*
        1. 여러페이지를 만들려면 [dynamicRoute]
        2. 현재 URL 검사 props/useRouter
        3. 페이지 이동, prefetch useRouter
    */
    return (
        <button onClick={()=>{ router.push('/')}}>버튼</button>
        /*
            router 쓰는경우
            - 페이지 이동 router.push('이동할 경로');
            - 뒤로가기 기능 router.back()
            - 앞으로가기 router.forward()
            - 새로고침 router.refresh() : 변동이 있는 html 부분만 리프레쉬 시킴 = soft refresh
            - 페이지 미리 로드 router.prefetch('로드할 경로') : 로드할 경로를 매우빠르게 로드하고 싶다 할때 씀 - 안쓰는 이유는 link 태그만 써도 프리패치됨
        */
    )
}


// 클라이언트 컴포넌트 만들기
// https://nextjs.org/docs/pages/api-reference/functions/use-router
// 서버컴포넌트에서 리액트 훅을 사용하고 싶을때는 지금처럼 따로 클라이언트 컴포넌트를 만들어서 import하여 사용한다.