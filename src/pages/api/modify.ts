import { connectDB } from '@/util/database';
import type { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth].js';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    let session = await getServerSession(req, res, authOptions);
    const data = req.body;
    if (session && req.method == 'POST'){
        try {
            let db = (await connectDB).db('forum');
            let result =  await db.collection('post').findOne({ _id : new ObjectId(data._id) })
            if (result.author == session.user?.email) {
                
                //return res.status(200).json(' 성공')
                res.status(200).redirect(302,`/update/${data._id.toString()}`);
              } else {
                return res.status(500).json('글쓴이 본인이 아니면 수정 할 수 없습니다.')
              }
        } catch (error){
            // db에러가 낫을경우 예외처리
            res.status(400).json('에러낫군!');
        }

     }
}