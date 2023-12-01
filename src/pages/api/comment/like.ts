import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    let session = await getServerSession(req, res, authOptions);
    const data = JSON.parse(req.body); //유저가보낸 데이터
    if (req.method == 'POST'){

        let neweData = {
            state:data.state,
            contentId: data.contentId,
            email: data.email
        }
        try {
            let db = (await connectDB).db('forum');
            let findList =  await db.collection('like').find({contentId: data.contentId}).toArray();

            const LikeList = findList.filter((item:any) => item.email == session?.user?.email)
            if (LikeList.find((con:any) => con.state == data.state)) {
                let result = await db.collection('like').deleteOne({contentId: data.contentId, email: data.email})
                return res.status(204).json('중복');
            } else {
                const result = await db.collection('like').updateOne({ contentId: data.contentId, email: data.email }, {
                    $set: neweData
                },{upsert: true});
                //{upsert: true} - 위의 데이터가 없으면 추가하고 있으면 수정한다는 의미
                res.status(200).json("성공");
            }
        } catch (error){
            // db에러가 낫을경우 예외처리
            res.status(400).json('에러낫군!');
        }

     }
}