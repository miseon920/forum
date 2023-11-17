import { connectDB } from '@/util/database';
import type { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    let session = await getServerSession(req, res, authOptions);
    const data = req.body._id;
    if (session && req.method == 'DELETE'){
        try {
            let db = (await connectDB).db('forum');
            let findList =  await db.collection('post').findOne({ _id : new ObjectId(data) })
            if (findList.author == session.user?.email) {
                let result = await db.collection('post').deleteOne({ _id : new ObjectId(data) })
                return res.status(200).json('삭제완료')
              } else {
                return res.status(500).json('현재유저와 작성자 불일치')
              }
        } catch (error){
            // db에러가 낫을경우 예외처리
            res.status(400).json('에러낫군!');
        }

     }
}