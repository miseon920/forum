import React from 'react'
import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import LoginBtn from '@/app/components/LoginBtn';

export default async function Update(props: any) {
    let db = (await connectDB).db('forum');
    let result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id)});
    let session = await getServerSession(authOptions)
    // MongoDB에서 게시물 하나만 찾고 싶으면 .findOne() 
    // console.log(props.params); //   props결과  { params: { id: '1' }, searchParams: {} }
    // console.log(props, 'props', result);
    //수정
    //await db.collection(컬렉션명).updateOne({수정할게시물정보}, { $set : {수정할내용} } ); 
    // await db.collection('post').UpdateOne({ _id: new ObjectId(props.params.id)},{
    //     $set:{title: '', content: ''}
    // });
    console.log(result, session);
  return (
    <>
    {  session && result.author == session.user?.email ?
        <div className='write p-20'>
            <form action="/api/update" method='POST'>
                <h4>수정페이지</h4>
                <input type="text" name='title' defaultValue={result.title} />
                <textarea name='content' placeholder='글내용' defaultValue={result.content}></textarea>
                <input type="hidden" name='_id' value={result._id.toString()} />
                {/* value 로 작성하면 변경되지 않아 nextjs에서 제공하는 defaultValue를 사용하면 된다. */}
                <button type='submit'>확인</button>
            </form>
        </div>
        : 
        <div> 글을 작성한 사용자가 아닙니다.{/* <LoginBtn session={session}/> */}</div>
    }
    </>
  )
}


/*
    # 다이나믹 라우트
    - [폴더명] 으로 작명하기
    - params 에 id의 URL 파라미터로 들어간 값을 _id 로 바꿈
    - dynamic route로 만든 URL에 적은 문자를 가져오고 싶으면 컴포넌트에서 params 출력
*/

/*
 병렬 라우팅
- 페이지 내 권한 제어: 페이지 내에서 특정 부분이나 기능을 권한에 따라 제어하고 싶은 경우에도 Parallel Routes를 사용할 수 있습니다. 예를 들어, 특정 버튼이나 폼 요소를 인증된 사용자에게만 보여주거나 사용 가능하도록 처리하고 싶을 때 Parallel Routes를 활용하여 해당 부분을 동적으로 렌더링하고 제어할 수 있습니다.
출처: https://rocketengine.tistory.com/entry/NextJS-13-Routing-Parallel-Routes-병렬-라우트 [OIL:티스토리]

https://nextjs.org/docs/app/building-your-application/routing/parallel-routes

----고급기술이라 아직 터득못해서..메인을보여주지 못했네요 ㅠㅠ

*/