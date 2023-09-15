import React from 'react'

export default function Write() {
  return (
    <div>
        <h4>글쓰기</h4>
        <form action="/api/api" method='POST'>
            {/*action에 url인 /api/api 주소로 요청 보냄, form은 get과 post만 쓸 수 있음 */}
            <button type='submit'>확인</button>
        </form>
    </div>
  )
}
