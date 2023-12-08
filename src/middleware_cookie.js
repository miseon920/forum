import { NextResponse, NextRequest } from 'next/server'; // next/server 까먹지 말자
// 미들웨어에서는 NextRequest를 사용하며 api에서는 NextApiRequest를 사용한다.
// https://nextjs.org/docs/pages/building-your-application/routing/api-routes#adding-typescript-types

export async function middleware(request) {
    // request.cookies.get('쿠키이름')  //출력
    // request.cookies.has('쿠키이름')  //존재확인
    // request.cookies.delete('쿠키이름')  //삭제
    
    // const response = NextResponse.next()
    // response.cookies.set({
    //   name: 'mode',
    //   value: 'dark',
    //   maxAge: 3600,
    //   httpOnly : true // 유저가 자바스크립트를 조작하는 것을 막을 수 있음
    // })  
    // return response  //쿠키생성

    //회원가입 페이지 방문시 쿠키 visited = true 만들기
    if (request.nextUrl.pathname.startsWith('/join')) {
        console.log('dd');
        const response = NextResponse.next();

        response.cookies.set({
            name: 'visited',
            value: 'true',
            maxAge: 3600,
            httpOnly : true // 유저가 자바스크립트를 조작하는 것을 막을 수 있음
        })  
        return response
    }
    return NextResponse.next();
}


/*
조작하면 안돼는 값들은 서버에 저장한다.

*/

