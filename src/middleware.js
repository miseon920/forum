import { NextResponse, NextRequest } from 'next/server'; // next/server 까먹지 말자
// 미들웨어에서는 NextRequest를 사용하며 api에서는 NextApiRequest를 사용한다.
// https://nextjs.org/docs/pages/building-your-application/routing/api-routes#adding-typescript-types
import { getToken } from 'next-auth/jwt'


export async function middleware(request) {
    /*미들웨어 안에서도 next/auth를 가져다 쓸수 있다. 따라서 로그인 정보를 알 수 있음
        jwt 방식을 쓰면 가져다 쓸 수 있으나 세션을 사용할 경우 세션정보가 들어있는 쿠키 출력 후 그 값이 db에 있는지 조회 해 봐야한다.
    */
    // 현재방식은 jwt
    const session = await getToken({req: request}); //await 으로 써야한다.
    //console.log(session) 비로그인 일경우 null

    if (request.nextUrl.pathname.startsWith('/write')) {
        if (session == null) {
            //NextResponse.redirect('/');
            console.log(request.url);
            return NextResponse.redirect(new URL('https://forum-one.vercel.app/api/auth/signin'), request.url); 
            // 보통 상대경로를 적나 풀경로를 적어줘야 할때도 있음 
        }
    }
    //console.log(request.nextUrl)  //유저가 요청중인 URL 출력해줌
    //console.log(request.cookies)  //유저가 보낸 쿠키 출력해줌
    //console.log(request.headers)  //유저의 headers 정보 출력해줌 
    //NextResponse.next()  //통과
    //NextResponse.redirect()  //다른페이지 강제 이동(url도 이동)
    //NextResponse.rewrite()  //다른페이지 이동(현재 url 유지)
    //console.log(request.nextUrl.pathname, '패쓰네임')
    //if (request.nextUrl.pathname == '/list') {
    if (request.nextUrl.pathname.startsWith('/list')) {
        //참고로 URL 뒤에 query string이라든지 그런걸 유저 맘대로 붙일 수 있기 때문에URL을 검사할 땐 등호보다는 .startsWith() 사용하는게 좋다.
        //console.log(request.headers.get('sec-ch-ua-platform'), 'os정보') - prefetch 기능이 켜있으면 다른페이지에 뜰 수도 있다.
        //get("자료형") 적는 이유: Map 자료형이기 때문
        console.log(new Date())
        return NextResponse.next(); // 미들웨어 마지막은 이부분을 꼭 써줘야 된다.(별일없으니 list페이지를 계속 로딩하시오!)
    }
}


/*
유저가 get, post 요청시 미들웨어가 실행되고나서 서버코드가 실행된다.
middleware는 app이랑 동일한 구조에 있어야 하므로 src 하위에 넣는다.

 # 미들웨어에서 로그인 정보를 알기 위해서는
 env 파일에 NEXTAUTH_SECRET= 값 이 있어야 한다. 

*/

