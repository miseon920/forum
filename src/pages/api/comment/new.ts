import { connectDB } from '@/util/database';
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]';
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextAuthOptions } from "next-auth";
import { ObjectId } from 'mongodb';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    let session = await getServerSession(req, res, authOptions) // 현재 로그인한 유저의 정보 가져오기 - await 까먹지말기
    if (session && req.method == 'POST'){
       const data = JSON.parse(req.body); //유저가보낸 데이터
        let dbContent = {
            content: data.comment,
            contentId: new ObjectId(data.contentId),
            email: session.user?.email,
            name: session.user?.name,
        }
        if (data.comment == '') {
            return res.status(200).json('내용쓰삼'); // 프론트에서도 체크하고 위조가능성이 있으므로 백에서도 체크하기
        } else if (!data.contentId) {
            return res.status(500).json('해당글이 존재 하지 않음');
        }
        // 서버에서 에러가 발생할 수도 있으므로 try catch 문안에 쓴다.
        try {
            // const {comment, contentId} = data; // input으로 받아온값 구조분해 할당
            let db = (await connectDB).db('forum');
            const result = await db.collection('comment').insertOne(dbContent);
            // console.log(result);
            // insertOne()은 promise를 리턴하므로 await 키워드를 붙여주고, 결과값을 result 변수에 담음
            // client.close(); 
             res.status(200).json('댓글이 작성 되었습니다.');
        } catch (error){
            // db에러가 낫을경우 예외처리
            res.status(400).json('에러낫군!');
        }

    }
    if (!session?.user?.email) {
        return res.status(500).json('로그인하세요');
    }
}