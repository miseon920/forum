import React from 'react'
import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb'

export default async function Update(props: any) {
    let db = (await connectDB).db('forum');
    let result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id)});
    // MongoDB에서 게시물 하나만 찾고 싶으면 .findOne() 
    // console.log(props.params); //   props결과  { params: { id: '1' }, searchParams: {} }
    // console.log(props, 'props', result);

    //수정
    // await db.collection(컬렉션명).updateOne({수정할게시물정보}, { $set : {수정할내용} } ); 
    // await db.collection('post').UpdateOne({ _id: new ObjectId(props.params.id)},{
    //     $set:{title: '', content: ''}
    // });
   console.log('result._id',result._id);
  return (
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
  )
}


/*
    # 다이나믹 라우트
    - [폴더명] 으로 작명하기
    - params 에 id의 URL 파라미터로 들어간 값을 _id 로 바꿈
    - dynamic route로 만든 URL에 적은 문자를 가져오고 싶으면 컴포넌트에서 params 출력
*/