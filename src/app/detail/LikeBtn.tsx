'use client'
import React from 'react'

const LikeBtn = ({contentId}: any) => {
  return (
    <div className='likeBtn'>
        <button className='text-white' onClick={()=>{
            // fetch('/api/comment/like', {
            //     method: 'POST', 
            //     body: JSON.stringify({
            //         contentId: item._id,
            //         email: session?.user?.email // 유저가 보내면 조작할수도있어서 서버에서 조회함
            //     })
            // })
        }}>조아요👍</button>
        <button className='mx-2 text-white'>싫어요👎</button>
    </div>
  )
}

export default LikeBtn