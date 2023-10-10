// db 연결하기
import { MongoClient } from 'mongodb'

const url:string = `${process.env.NEXT_PUBLIC_DB_RUL}`
const options = { useNewUrlParser: true }
let connectDB: any

let globalWithMongoClientPromise = global as typeof globalThis & {
    _mongo: Promise<MongoClient>;
};

if (process.env.NODE_ENV === 'development') {
  if (!globalWithMongoClientPromise._mongo) {
    globalWithMongoClientPromise._mongo = new MongoClient(url).connect()
  }
  connectDB = globalWithMongoClientPromise._mongo
} else {
  connectDB = new MongoClient(url).connect()
}
export { connectDB }  // connect가 필요한 곳에서만 사용하기 connectDB


/* 몽고디비 타입스크립트 연결시 타입에러
    https://velog.io/@annkim7/plant-gallery-mongodb-%EC%97%B0%EA%B2%B0%EC%8B%9C-%ED%83%80%EC%9E%85%EC%97%90%EB%9F%AC
*/


/*
- connectDB 변수를 만들어서 MongoClient.connect 결과를 저장해두고 export 해서 필요할 때마다 사용
- Nextjs의 경우 개발할 땐 파일저장할 때 마다 자바스크립트 파일들이 재실행되기 때문에 MongoClient.connect가 동시에 여러개 실행될 수 있다. 
- 그럼 DB입출력이 매우 느려지므로 개발중 상태면 global이라는 전역변수 저장소에 보관하고 실제 프로덕션 상태일 땐 global을 사용안하는게 좋아서 else문 추가
- 프로덕션 상태일 땐 중복실행될 일이 별로 없음
*/