import { connectDB } from '@/util/database';
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]';
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextAuthOptions } from "next-auth";
import { ObjectId } from 'mongodb';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    //쿼리 스트링 가져다쓰기
    const data:any = req.query.id;
     // console.log(data);
    let db = (await connectDB).db('forum');
    let result = await db.collection('comment').
    find({contentId: new ObjectId(data)}).
    toArray();
    //find()만 쓰면 모든 글을 다 가져오므로 finde안에 조건을 적어준다.
    // result = result.map((item: any)=>{
    //     item._id = item._id.toString()
    //     return item
    // })

    res.status(200).json(result);
}