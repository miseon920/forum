// 서버기능
import type { NextApiRequest, NextApiResponse } from 'next'
// export default function handler(요청, 응답) {
export default function handler(req:NextApiRequest, res:NextApiResponse) {
    //console.log('test'); // 주소창에 로컬호스트/api/api 요청시 터미널을 확인하면 확인가능
    // 서버에서 요청시 응답이 없으면 무한루트가 돌기 때문에 응답을 줘야함
    // 파라미터로 요청과 응답에 관한것을 넣어줘야한다.
    // if (req.mehod == 'POST') {
    //     return res.status(500).json('실패');
    // } - 요청에 따라서 응답을 다르게 하고 싶을 때 작성
    // return res.status(200).json('처리완료');
    // object, array, 문자, 숫자 아무거나 전송가능 
    // if (req.method == 'GET'){
    //     res.status(200).json({ name: '안녕' })
    // }
    // if (req.method == 'POST'){
    //     res.status(200).json({ name: '바보' })
    // } - DB 입출력하는 코드를 작성해도 됨

    // 현재 시간
    let today = new Date();
    // 날짜
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);

    let dateString = year + '-' + month  + '-' + day;
    
    //시간
    let hours = ('0' + today.getHours()).slice(-2); 
    let minutes = ('0' + today.getMinutes()).slice(-2);
    let seconds = ('0' + today.getSeconds()).slice(-2); 

    let timeString = hours + ':' + minutes  + ':' + seconds;

    res.status(200).json('날짜 ' + dateString + ' 시간 ' + timeString)

}


/*
    pages/api/api로 요청을 하면 파일안의 코드를 자동으로 실행해줌 = nextjs 자동 라우팅 기능
    
    # 서버 응답코드 (status code)
    - status(200): 처리성공
    - status(500): 처리 실패
    - status(400): 유저 잘못으로 실패

*/