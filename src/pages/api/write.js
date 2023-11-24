import { connectDB } from '@/util/database';
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req, res) {
    let session = await getServerSession(req, res, authOptions) // 현재 로그인한 유저의 정보 가져오기 - await 까먹지말기
    if (session && req.method == 'POST'){
        const data = req.body; //유저가보낸 데이터
        req.body.author =  session.user.email; // 유저정보 eamil도 추가하기
        //console.log(data);
        if (req.body.title == '') {
            return res.status(500).json('제목써'); // 프론트에서도 체크하고 위조가능성이 있으므로 백에서도 체크하기
        } else if (req.body.content == '') {
            return res.status(500).json('내용써');
        }
        // 서버에서 에러가 발생할 수도 있으므로 try catch 문안에 쓴다.
        try {
            const {title, content} = data; // input으로 받아온값 구조분해 할당
            let db = (await connectDB).db('forum');
            const result = await db.collection('post').insertOne(data);
            // console.log(result);
            // insertOne()은 promise를 리턴하므로 await 키워드를 붙여주고, 결과값을 result 변수에 담음
            // client.close(); 
             // res.status(200).json('처리완료');
             // 경로이동 
             res.status(200).redirect(302,'/list');
        } catch (error){
            // db에러가 낫을경우 예외처리
            res.status(400).json('에러낫군!');
        }

     }
}