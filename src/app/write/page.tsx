import React from 'react'

export default function Write() {
  return (
    <div className='write p-20'>
        <form action="/api/write" method='POST'>
            <h4>글쓰기</h4>
            {/*action에 url인 /api/api 주소로 요청 보냄, form은 get과 post만 쓸 수 있음 */}
            <input type="text" name='title' placeholder='글제목' />
            <textarea name='content' placeholder='글내용'></textarea>
            <button type='submit'>확인</button>
        </form>
    </div>
  )
}
