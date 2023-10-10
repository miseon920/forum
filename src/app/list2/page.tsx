import React from 'react'
import { connectDB } from '@/util/database';
import ListItem from '../components/ListItem';

// 다이나믹 랜더링으로 변경하기
// export const dynamic = 'force-dynamic'; // 이페이지는 다이나믹 페이지로 보여주겠다는 의미
export const revalidate = 20; // 이페이지는 60초 지나면 다시 캐싱한다. - 페이지 단위 캐싱

// force-statc = 이페이지를 보여줄때는 스태틱으로 보여주겠다는 의미
// 작업 후 build -> start를 해서 확인

export default async function List() {
    let db = (await connectDB).db('forum');
    let result = await db.collection('post').find().toArray();

    /* get 요청결과 캐싱기능 - 서버 자원 절약 및 db 부담을 줄일 수 있음
        await fetch('url', {cache: 'force-cache'}) <-> {cache: 'force-cache'} 를 생략해도 캐싱이 된다.
        await fetch('url', {cache: 'no-store'}) 로 쓰게 되면 매번 서버로 요청해서 새 결과를 가져온다. (실시간 데이터가 중요한경우)
        await fetch('url', {next: {revalidate: 60}'}) 로 쓰게 되면 60초마다 캐싱된 데이터로 갱신해 준다.
        > 위의 디비 결과를 사용할 api로 바꾼 후 fetch로 가져다 쓰면 캐싱기능을 사용 할 수 있다.
        > fetch로 쓰기 싫다면 revalidate 예약 변수를 쓰면 페이지 단위로 캐싱이 가능하다. - 이전에는 이부분을 ISR이라고 불렀음
        > server component 안에서만 캐싱기능 사용가능
    */

    // console.log(result[0])

    // array > object 꺼내기
    return (
    //   <ListItem result={result}/>
      <ListItem  result={result} />
    )
  } 

// await은 promise를 반환하는곳에서만 사용가능 
// 시작 괄호로 자료 꺼내기 [{},{}] 으로 되어있으므로 array이므로 result[0] 먼저 찍구 그 안에 오브젝트 이므로 .속성값 으로 값을 찍는다.