'use client'

import React, { useEffect, useState } from 'react'

const ToggleMode = () => {
    const [mode, setMode] = useState("light");

    const displayMode = (display: string) => {
        if (display == 'light') {
            localStorage.setItem("displayMode", "dark");
            setMode("dark");
        } else {
            localStorage.setItem("displayMode", "light");
            setMode("light");
        }
    }

    useEffect(()=>{
        if (typeof window != 'undefined') { // 현재 위치가 브라우저인지 서버인지 확인하는 조건문
            const localState = localStorage.getItem("displayMode");
            if(localState) {
                setMode(localState); // 로컬스트로지로 할경우 잠깐 1초동안 light를 보여줬다가 바뀌기 때문에 단점이 있다. 
            } else {
                localStorage.setItem("displayMode", mode);
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
쿠키는 서버 클라이언트에서도 출력 가능하다.
*/