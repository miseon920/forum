'use client'
import React, { useEffect, useState, useCallback, KeyboardEvent } from 'react'
import {useSession} from 'next-auth/react'
// export interface commentInfo {
//     comment: string
// }

const Comment = ({contentId}: any) => {
    let [comment, setComment] = useState('');
    let [data, setData] = useState<any[]>([]);
    //const { data: session } = useSession();

    const handleOnKeyPress = (e : KeyboardEvent<HTMLInputElement>) => {
        // 키보드 이벤트 추가시 import 해야한다.
        if (e.key === 'Enter') {
            commentSubmit(); // Enter 입력이 되면 클릭 이벤트 실행
        }
      };
      // 인풋에 적용할 Enter 키 입력 함수

    const commentSubmit = () => {
        fetch('/api/comment/new', {
            method: 'POST', 
            body: JSON.stringify({
                comment,
                contentId,
                // email: session?.user?.email - 유저가 보내면 조작할수도있어서 서버에서 조회함
            })
        }).then((result) => result.json()).
        then((result)=>{
            alert(result);
            getInit();
        }).catch(e => console.log(e));
    }
    const getInit = useCallback(async () => {
        //contentId로 해도되고 props.params.id를 써도 된다.
        await fetch(`/api/comment/list?id=${contentId}`).then((result) => result.json()).
        then((result)=>{
            setData(result);
            setComment('');
        }).
        catch(e => console.log(e));
    },[contentId]);
    // 컴포넌트 로드시 서버에 데이터 요청을함
    useEffect(()=>{ // html 로드 후 useEffect 실행
        getInit();
    },[getInit])
  return (
    <>
        <div className='commentBox'>
            <div className='px-2 py-2'>
                <h4>댓글</h4>
                <ul>
                    { data && data.map((item, idx) => {
                            return(
                                <li key={idx} className='commentBg'>
                                    <div>
                                        <span>{item.name} : </span>
                                        <span>{item.content}</span>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className='flex'>
                <input type="text" onChange={(e)=>{setComment(e.target.value)}} value={comment} onKeyDown={(e)=>handleOnKeyPress(e)}/>
                {/* input의 value에 입력으로 받는 comment 상태를 설정해야 비울수가 있다. */}
                <button className='mx-2' onClick={()=> commentSubmit()}>댓글 전송</button>
            </div>
        </div>
    </>
  )
}

export default Comment

/*
    form 태그는 새로고침이 되므로 새로고침없이 하기 위해서 
    * form 태그를 안쓰는 경우
    1. input값을 state에 저장한다.
    2. 저장한 값을 fetch로 서버에 보낸다.
    3. 댓글이 많기 때문에 post에 있는 해당글에 속하는 곳에 댓글을 array형태로 넣으면 수정 삭제가 어려워진다.
    4. 댓글마다 독립적으로 저장해도 된다. 
    5. 독립적으로 저장할경우 댓글 및 그댓글이 달린 부모 게시물의 id도 함께 저장한다.
    6. db 저장시에 추후 수정,삭제,출력 등 유지보수가 잘되면 잘 짠것이고 그게 어렵다면 종속관계가 잘 나타나게 짜야한다.
*/