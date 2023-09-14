import {connectDB} from "@/app/util/database"

export default async function Home() {
    // const client = await connectDB;
    // const db = client.db('forum'); // 디비연결 - 데이터 베이스 이름 연결
    // // db.collection('post').find() // 몽고디비 데이터 출력 - 컬렉션 이름 기입
    // let result =  await db.collection("post").find().toArray(); // 모든 데이터 가져오기

    // 코드 줄이기 - DB입출력하는 코드는 서버 컴포넌트에서만 작성하기 
    // 모든 데이터 가져오기
    // let db = (await connectDB).db('forum');
    // let result = await db.collection('post').find().toArray();
    // console.log(result)
    return (
    <div>g2</div>
    )
}
