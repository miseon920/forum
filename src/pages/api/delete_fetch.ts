import { connectDB } from '@/util/database';
import type { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if (req.method == 'DELETE'){
        const data = JSON.parse(req.body); //따옴표를 제거해서 array, object로 만들기
        // 지금은 숫자만 있으나 공부할겸 제이슨으로 보내봤음
        // 서버에서 에러가 발생할 수도 있으므로 try catch 문안에 쓴다.
        try {
            let db = (await connectDB).db('forum');
            const result = await db.collection('post').deleteOne({ _id: new ObjectId(data._id)});
            /*
                $set 연산자는 기존 값을 바꿔줍니다. 만약에 없으면 추가해줌

                $unset 연산자는 기존에 있던 키값을 제거

                $inc 연산자는 기존 값이 숫자면 거기에 숫자를 더하거나 뺄 때 사용
            */
            // console.log(result);
            // insertOne()은 promise를 리턴하므로 await 키워드를 붙여주고, 결과값을 result 변수에 담음
            // client.close(); 
            // console.log(result);
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
}