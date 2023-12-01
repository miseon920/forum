'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { getSession, useSession} from 'next-auth/react'

const LikeBtn = ({contentId}: any) => {
    const { data: session, status } = useSession();
    const [likeOn, setLikeOn] = useState(false);
    const [hateOn, setHateOn] = useState(false);
    const [likeCnt, setLikeCnt] = useState(0);
    const [hateCnt, setHateCnt] = useState(0);

    function likeHandle(state: string) {
        if (session) {
            if (session.user?.email) {
                fetch('/api/comment/like', {
                    method: 'POST', 
                    body: JSON.stringify({
                        state: state,
                        contentId,
                        email: session?.user?.email // 유저가 보내면 조작할수도있어서 서버에서 조회함
                    })
                }).then((result) => {
                        if (result.status == 200) {
                            if (state == 'like') {
                                setLikeOn(true);
                                setHateOn(false);
                            } else {
                                setHateOn(true);
                                setLikeOn(false);
                            }
                        }
                        return result.json();
                }).then((result)=>{
                    if (result != '성공') {
                        alert(result);
                    }
                    getInit();
                }).catch(e => console.log(e));
            }
        } else {
            alert("로그인 후 사용 가능합니다.");
        }
    }

    const getInit = useCallback(async () => {
        //useCallback은 함수를 새로 만들지 않고 재사용하고 싶을 때 사용하는 hook이다
        //의존성 배열에 넣은 값이 변경되기 전까지 재사용
        const session = await getSession();
        //https://next-auth.js.org/v3/getting-started/client 
        // 세션 개체가 포함된 Promise를 호출 /api/auth/session하고 반환합니다. 세션이 없으면 null을 반환합니다.
        await fetch(`/api/comment/likeList?id=${contentId}`).then((result) => result.json()).
        then((result)=>{
            if (result) {
                const likeList = result.filter((item:any) => item.state == 'like');
                const hateList = result.filter((item:any) => item.state == 'hate');

                setLikeCnt(likeList.length);
                setHateCnt(hateList.length);
            }
            const myLikeList = result.filter((item:any) => item.email == session?.user?.email);
            if (myLikeList[0].state) {
                if (myLikeList[0].state == 'like') {
                    setLikeOn(true);
                } else {
                    setHateOn(true);
                }
            }
        }).catch(e => console.log(e));
      }, [contentId]);

    useEffect(()=> {
        getInit();
    },[getInit])
  return (
    <div className='likeBtn'>
        <button className={`text-white ${likeOn ? 'on' : ''}`} onClick={()=> likeHandle("like")}>조아요👍 ({likeCnt})</button>
        <button className={`mx-2 text-white ${hateOn ? 'on' : ''}`} onClick={()=> likeHandle("hate")}>싫어요👎 ({hateCnt})</button>
    </div>
  )
}

export default LikeBtn