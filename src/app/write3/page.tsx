'use client'

import React from 'react'
import {handleSubmit} from './action'

export default async function Write2() { //use server 사용시 async를 붙여줘야 한다.
    // 'use client' 일경우 여기에 서버액션을 적으면 위험하므로 따로 작성한다.
    // async function handleSubmit2(formData: any) { // formData는 사용자가 보낸 정보
    //     'use server'  //서버에서 쓰는 api가 된다. async를 붙여줘야 한다. - 유저에게는 안보임
    //     console.log('fff',formData.get('title')); // 타이틀을 가져올 수 있다.
    // }
    return (
        <div className='write p-20'>
            <h4>클라이언트 서버액션 글쓰기</h4>
            <form action={handleSubmit}>
                <input type="text" name='title' />
                <button type='submit'>버튼</button>
            </form>
        </div>
    )
}