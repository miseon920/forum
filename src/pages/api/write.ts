import { connectDB } from '@/util/database';

export default async function handler(req, res) {
    if (req.method == 'POST'){
        const data = req.body;
        const {title, content} = data; // input으로 받아온값 구조분해 할당
        console.log(data);
        //let db = (await connectDB).db('forum');
         res.status(200).json('처리완료')
     }
}