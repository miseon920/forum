import { connectDB } from '@/util/database';
import type { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const data = req.query.id;

    try{
        let db = (await connectDB).db('forum');
        const result = await db.collection('post').deleteOne({ _id: new ObjectId(`${data}`)});
        if (result.deletedCount > 0) {
            res.status(200).json('처리완료');
        } else {
            res.status(500).json('삭제된게없음');
        }
    } catch (error){
        // db에러가 낫을경우 예외처리
        res.status(400).json('에러낫군!');
    }
}