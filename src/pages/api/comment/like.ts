import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if (req.method == 'POST'){
        const data = JSON.parse(req.body); //유저가보낸 데이터

        let db = (await connectDB).db('forum');
        // let result = await db.collection('like').find({contentId}).toArray();
        // console.log(result, 'dd')
        // if (result.find((con:any) => {
        //     console.log(con, '11')
        //     con.email == data.email})) {

        //     return res.status(500).json('이미 좋아한 글임');
        // }
        // 서버에서 에러가 발생할 수도 있으므로 try catch 문안에 쓴다.
        try {
            let db = (await connectDB).db('forum');
            // const result = await db.collection('like').insertOne(data);
            // const result = await db.collection('post').updateOne({ _id: new ObjectId(req.body._id)}, {
            //     $set: nweData
            // });
            // /*
            //     $set 연산자는 기존 값을 바꿔줍니다. 만약에 없으면 추가해줌

            //     $unset 연산자는 기존에 있던 키값을 제거

            //     $inc 연산자는 기존 값이 숫자면 거기에 숫자를 더하거나 뺄 때 사용
            // */
            // // console.log(result);
            // // insertOne()은 promise를 리턴하므로 await 키워드를 붙여주고, 결과값을 result 변수에 담음
            // // client.close(); 
            //  // res.status(200).json('처리완료');
            //  // 경로이동 
            //  res.status(200).redirect(302,'/list');
        } catch (error){
            // db에러가 낫을경우 예외처리
            res.status(400).json('에러낫군!');
        }

     }
}