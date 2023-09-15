import React from 'react'
import { connectDB } from '@/app/util/database';
import Link from 'next/link';

export default async function List() {
    let db = (await connectDB).db('forum');
    let result = await db.collection('post').find().toArray();
    console.log(result[0])

    // array > object 꺼내기
    return (
      <div className="list-bg">
        {
            result.map((item:{}, idx:number)=>
                <div className="list-item" key={idx}>
                    <Link href={`/detail/${result[idx]._id}`}>
                        <h4>{result[idx].title}</h4>
                        <p>1월 1일</p>
                    </Link>
                </div>
            )
            // {return()} 생략가능
        }
      </div>
    )
  } 

// await은 promise를 반환하는곳에서만 사용가능 
// 시작 괄호로 자료 꺼내기 [{},{}] 으로 되어있으므로 array이므로 result[0] 먼저 찍구 그 안에 오브젝트 이므로 .속성값 으로 값을 찍는다.