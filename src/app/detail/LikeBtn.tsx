'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { useSession} from 'next-auth/react'

const LikeBtn = ({contentId}: any) => {
    const { data: session, status } = useSession();
    let [likeData, setlikeData] = useState<any[]>([]);
    const [likeOn, setLikeOn] = useState(false);
    const [hateOn, setHateOn] = useState(false);

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
                }).catch(e => console.log(e));
            }
        } else {
            alert("로그인 후 사용 가능합니다.");
        }
    }

    const getInit = useCallback(async () => {
        //useCallback은 함수를 새로 만들지 않고 재사용하고 싶을 때 사용하는 hook이다
        //의존성 배열에 넣은 값이 변경되기 전까지 재사용
        fetch(`/api/comment/likeList?id=${contentId}`).then((result) => result.json()).
        then((result)=>{
            setlikeData(result);
            const LikeList = result.filter((item:any) => item.email == session?.user?.email);
            if (LikeList[0].state) {
                if (LikeList[0].state == 'like') {
                    setLikeOn(true);
                } else {
                    setHateOn(true);
                }
            }
           // console.error(result, '22');
        }).catch(e => console.log(e));
      }, [likeData]);

    useEffect(()=> {
        getInit();
    },[getInit])
  return (
    <div className='likeBtn'>
        <button className={`text-white ${likeOn ? 'on' : ''}`} onClick={()=> likeHandle("like")}>조아요👍</button>
        <button className={`mx-2 text-white ${hateOn ? 'on' : ''}`} onClick={()=> likeHandle("hate")}>싫어요👎</button>
    </div>
  )
}

export default LikeBtn