'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"

//쿠키로 해보기
const ToggleMode = () => {
    const [mode, setMode] = useState("light");
    let router = useRouter()

    const displayMode = (display: string) => {
        if (display == 'light') {
            document.cookie = 'displayCookie=dark; max-age=' + (3600 * 24 * 400)
            setMode('dark');
            router.refresh()
        } else {
            document.cookie = 'displayCookie=light; max-age=' + (3600 * 24 * 400)
            setMode('light');
            router.refresh()
        }
    }

    useEffect(()=>{
        if (typeof window != 'undefined') { // 현재 위치가 브라우저인지 서버인지 확인하는 조건문
            let cookieVal = document.cookie.split("; ").find((row) => row.startsWith("displayCookie="))?.split("=")[1];
            // console.error(cookieVal)
            //displayCookie 쿠키값이 빈값일때만 세팅하기
            if (cookieVal == '') {
                document.cookie = `displayCookie=${mode}; max-age=` + (3600 * 24 * 400);
            } else {
                setMode(`${cookieVal}`);
            }
        }
    },[mode])
  return (
    <div className='displayMode' onClick={()=> displayMode(mode)}>
        {
            mode == 'light' ? 
            <span>☀️</span>
            :<span>🌙</span>
        }
        
        
    </div>
  )
}

export default ToggleMode

/*
로컬스트로지는 클라이언트 컴포넌트에서만 출력가능하나
쿠키는 서버 클라이언트에서도 출력 가능하다. (get,post 요청시 자동으로 서버로 보내진다.)

쿠키는 서버 api나 미들웨어에서도  만들 수 있다.
*/