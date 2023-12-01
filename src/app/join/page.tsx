import { redirect } from "next/navigation";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export default async function Join() {
    let session = await getServerSession(authOptions);

    if (session) {
        redirect("/");
    }
    return (
        <div className='write p-20'>
            <form action="/api/join" method='POST'>
                <h4>회원가입</h4>
                {/*action에 url인 /api/api 주소로 요청 보냄, form은 get과 post만 쓸 수 있음 */}
                <input type="text" name='email' placeholder='이메일' />
                <input name='password' placeholder='패수워드' />
                <input name='name' placeholder='이름' />
                <button type='submit'>확인</button>
            </form>
        </div>
    )
}


// 추후 프론트단 유효성 검사 및 중복검사 추가하기!