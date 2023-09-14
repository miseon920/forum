import React from 'react'
import { connectDB } from '@/app/util/database';
import { ObjectId } from 'mongodb'

export default async function Detail(props: any) {
    let db = (await connectDB).db('forum');
    // let result = await db.collection('post').findOne({title: '안녕'}); // 게시물 한개만 찾을때 - 제목으로 가져오면 중복이 걸리면 하나만 가져오므로 보통 id로 가져온다.
    let result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id)});
    // MongoDB에서 게시물 하나만 찾고 싶으면 .findOne() 
    console.log(props.params); //   props결과  { params: { id: '1' }, searchParams: {} }
  return (
    <div>
        <h4>상세페이지</h4>
        <h3>{result.title}</h3>
        <p>글내용</p>
    </div>
  )
}


/*
    # 다이나믹 라우트
    - [폴더명] 으로 작명하기
    - params 에 id의 URL 파라미터로 들어간 값을 _id 로 바꿈
    - dynamic route로 만든 URL에 적은 문자를 가져오고 싶으면 컴포넌트에서 params 출력
*/