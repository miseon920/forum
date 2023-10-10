'use client'

import React,{useState} from 'react'
import Link from 'next/link';
import DetailLink from '../list/DetailLink';
import { ObjectId } from 'mongodb'
type HTMLElementEvent<T extends HTMLElement> = Event & {
    target: T;
}

export default function ListItem({result}: any) {
    // const [num, setNum] = useState(0);
    // 클라이언트 컴포넌트에서는 db를 조작하는것을 적으면 안됌, 예)let db = ...
    // 컴포넌트가 많아질수록 props를 쓰는 것은 매우복잡할수 있으므로 서버에 요청하는 방식으로 쓰는것이 효율적이다
    // 클라이언트 컴포넌트에서 db를 가져올때는 서버에 요청하는 방식으로 해야함
    // 다만 useEffect로 가져오게되면 검색노출이 어렵다는 단점이 발생 = 이유는 html 모두 실행 후 useEffct가 실행하기 때문
    // 따라서 검색엔진을 중요시 한다면 props로 해야한다.

    // useEffect(() => {
      
    
    //   return () => {
        
    //   }
    // }, [])
    function animation(e:React.MouseEvent<HTMLButtonElement>) {
        // 옵셔널 체이닝을 사용하는것을 추천하나 돔의 값이 null이 될수 있어 타입 단언선언 하였음
        const target = e.target as Element;
        target.parentElement!.style.opacity = "0";
        setTimeout(()=>{
            target.parentElement!.style.display = 'none';
        }, 1000)
    }

     function deletePost(item:any, e:React.MouseEvent<HTMLButtonElement>) {
        /* form으로 요청시 항상 새로고침이 되는대 ajax로 요청시에는 새로고침이 없음
            - get 요청은 fetch('/url')
            - 요청완료시 코드실행은 .then()
        */
        fetch(`/api/delete?id=${item._id.toString()}`)
        .then((res)=> res.json())
        .then((res)=>{
            alert(res);
            animation(e);
        }).catch(e => console.log(e)); 

    }   // fetch 코드가 워낙 길기 때문에 axios 라이브러리를 보통 사용한다.
        // 하지만 next13에서 fetch에 기능이 추가되었기 때문에 서버컴포넌트에서는 fetch를 사용하는것이 좋다.

  return (
    <div className="list-bg">
        {/* <h4>{num}</h4> */}
        {
            result.map((item:{}, idx:number)=>
                <div className="list-item" key={idx}>
                    <Link href={`/detail/${result[idx]._id}`} prefetch={false}> {/* 게시판의 경우 모든 링크를 다 볼게 아니므로 미리로드할 필요가 없으므로 프리패치를 모두 다 시키면 무리가 있으므로 prefetch={false} 시킴 : 개발중에는 확인 불가하고 배포환경에서 확인가능 */}
                        {/* object로 나올경우 result[idx]._id.toString() 으로 하여 문자로 변환 시켜야함 */}
                        <h4>{result[idx].title}</h4>
                        <p>1월 1일</p>
                    </Link>
                    <DetailLink item={item} />
                    <button className='delBtn' onClick={(e)=> {
                        deletePost(item, e);
                    }}>삭제 🗑️</button>
                </div>
            )
            // {return()} 생략가능
        }
      </div>
  )
}

/*
    tip: GET요청으로도 데이터를 서버로 보내는 방법
    url에 데이터를 담아 보내기

    1. query string 사용하기
    - URL작성할 때 뒤에 물음표를 붙이고 데이터이름=값 으로 보내기
    - 서버측에서 쿼리스트링으로 온 부분 출력하기 console.log(요청.query)

    2. URL parameter 사용하기
    - 클라이언트쪽과 마찬가지로 서버에서도 [다이나믹경로] 를 쓰게 되면 [다이나믹경로].ts 가 발생한다.
    - 서버측에서는 요청.query 를 사용하여 출력할 수 있다.

    3. delete_fetch는 POST요청이고 GET요청으로 해보기
*/