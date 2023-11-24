import { connectDB } from '@/util/database';
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    let db = (await connectDB).db('forum');
    let result = await db.collection('join').find().toArray();
    let role;
    if (req.method == 'POST'){
        const data = req.body; //유저가보낸 데이터
        let hash =  await bcrypt.hash(data.password, 10); // 비밀번호 암호화 하기
        data.password = hash; //기존 비밀번호를 암호화된 비밀번호로 변경하기

        if (req.body.email == 'miseon920@naver.com') { 
            role = 'admin'
        } else {
            role = 'normal'
        }

        req.body.role = role;

        if (req.body.email == '') {
            return res.status(500).json('아이디 입력'); // 프론트에서도 체크하고 위조가능성이 있으므로 백에서도 체크하기
        } else if (req.body.password == '') {
            return res.status(500).json('패스워드 입력');
        } else if (req.body.name == '') {
            return res.status(500).json('이름 입력');
        }

        if (result.find((con:any) => con.email == req.body.email)) {
            return res.status(500).json('중복');
        }

        // 서버에서 에러가 발생할 수도 있으므로 try catch 문안에 쓴다.
        try {
            const {email, password, name} = data; // input으로 받아온값 구조분해 할당
            let db = (await connectDB).db('forum');
            const result = await db.collection('join').insertOne(data);

            res.status(200).redirect(302,'/');
        } catch (error){
            // db에러가 낫을경우 예외처리
            res.status(400).json('에러낫군!');
        }

     }
}

/*
    비밀번호는 그대로 저장하면 db가 해킹될경우 비밀번호가 다 노출되므로 
    npm i bcrypt 설치
    npm i --save-dev @types/bcrypt   //타입스크립트일 경우

    [...nextauth].js에 Credentials provider 설정하기
*/