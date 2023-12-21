//'use client' 를 사용할 경우 서버 api를 아래에 적으면 위험 하므로 따로 파일을 만들어서 관리한다.

import React from 'react'
import { connectDB } from '@/util/database';
import { revalidatePath } from "next/cache" //페이지 상단에 추가

export default async function Write2() { //use server 사용시 async를 붙여줘야 한다.
    //디비내용 보여주기
    const db = (await connectDB).db('forum')
    let result = await db.collection('post2').find().toArray()

    //폼전송시 동작할 서버 api를 만들어야하나 이 위치에 작성 가능하다.
    async function handleSubmit(formData: any) { // formData는 사용자가 보낸 정보
        'use server'  //서버에서 쓰는 api가 된다. async를 붙여줘야 한다. - 유저에게는 안보임
        //console.log('액션 타이틀',)formData.get('title'); // 타이틀을 가져올 수 있다.

        //서버랑 같으므로 db 입출력하는 부분을 적을 수 있다.
        let db = (await connectDB).db('forum');
        await db.collection('post2').insertOne({title : formData.get('title')})
        revalidatePath('/write2');
    }
    // 여러개를 만들 수 있다.
    // async function handleSubmit2(formData: any) { // formData는 사용자가 보낸 정보
    //     'use server'  //서버에서 쓰는 api가 된다. async를 붙여줘야 한다. - 유저에게는 안보임
    //     console.log('fff',formData.get('title')); // 타이틀을 가져올 수 있다.
    // }
    return (
        <div className='write p-20'>
            <h4>서버액션 글쓰기</h4>
            <form action={handleSubmit}>
                <input type="text" name='title' />
                <button type='submit'>버튼</button>
            </form>
            {
                result ? result.map((res:any, idx: number)=>
                <p key={idx}>글제목 : {res.title}</p>
                )
                : null
            }
        </div>
    )
}

/*
 action={ } 써놓으면 폼전송시 새로고침이 되지 않습니다. 
새로고침하려면 router.refresh()를 쓰거나 서버컴포넌트라면 revalidatePath, revalidateTag 이런걸 써야한다.  
revalidatePath 는 변경된 부분만 새로고침한다. 
 */