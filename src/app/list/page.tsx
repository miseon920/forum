import React from 'react'
import { connectDB } from '@/util/database';
import Link from 'next/link';
import DetailLink from './DetailLink';

export default async function List() {
    let db = (await connectDB).db('forum');
    let result = await db.collection('post').find().toArray();
    // console.log(result[0])

    // array > object 꺼내기
    return (
      <div className="list-bg">
        {
            result.map((item:{}, idx:number)=>
                <div className="list-item" key={idx}>
                    <Link href={`/detail/${result[idx]._id}`} prefetch={false}> {/* 게시판의 경우 모든 링크를 다 볼게 아니므로 미리로드할 필요가 없으므로 프리패치를 모두 다 시키면 무리가 있으므로 prefetch={false} 시킴 : 개발중에는 확인 불가하고 배포환경에서 확인가능 */}
                        {/* object로 나올경우 result[idx]._id.toString() 으로 하여 문자로 변환 시켜야함 */}
                        <h4>{result[idx].title}</h4>
                        <p>1월 1일</p>
                    </Link>
                    <DetailLink />
                </div>
            )
            // {return()} 생략가능
        }
      </div>
    )
  } 

// await은 promise를 반환하는곳에서만 사용가능 
// 시작 괄호로 자료 꺼내기 [{},{}] 으로 되어있으므로 array이므로 result[0] 먼저 찍구 그 안에 오브젝트 이므로 .속성값 으로 값을 찍는다.