# 관계형 db

- 항목이 정해져 있음
- 데이터를 엑셀처럼 표에 저장
- 데이터 입출력시 SQL이라는 언어를 사용하고 미리 스키마 정의(표만들기)도 해야하고 데이터 중복저장을 피하기 위해 정규화해야함
- 안정적인 데이터저장과 운영이 필요한 곳에서 사용

# 비관계형 db

- 오브젝트 형태로 저장함(array처럼)
- 분산처리를 잘해줌(대용량 트래픽 분산처리 : SNS 서비스처럼 많은 데이터 입출력이 필요할때 강점)
- 몽고디비에서 무료 호스팅 사용하기
- SQL 언어, 스키마 정의(표 만들기), 정규화 이런게 대부분 필요없음

# MongoDB (비관계형 db)

- 데이터를 자바스크립트 object자료형과 똑같은 모양으로 저장
- 500mb 정도 용량의 무료 호스팅 <mongodb.com>, free로 선택후 aws로 선택, 국가는 서울로 선택한다.

    1. MongoDB 저장방식
        - collection 생성 -> document 생성 -> 데이터 기록
        - 게시판(collection)이라는 큰 폴더안에 리스트(document) 하나하나가 도큐먼트가 되고 그안에 항목들이 데이터가 된다고 이해함
        - 몽고디비 crud 배우기 (😊crud : 기본적인 데이터 처리 기능인 Create(생성), Read(읽기), Update(갱신), Delete(삭제) 를 묶어서 일컫는 말)

    2. Security > Database Access
        - db 접속용 아이디와 비밀번호 만드는 곳
    3. Security > Network Access
        - db 접속가능한 ip로 설정 - 개발할경우 안전한 ip 추가
    4. DEPLOYMENT > Database > Browse Collections >Collections 에서 db를 확인 할 수 있음
    5. Add My Own Data -> 데이터베이스 만들기
    6. 데이터 베이스는 하나의 홈페이지라고 보면됨 - 큰사이트는 여러개 가질수도 있음
    7. 컬렉션으로 게시판을 만들거니까 post라고 적음(하나의 폴더라구 생각하기)
    8. Insert Document 클릭 하여 도큐먼트 만들기

# MongoDB 데이터 가져오기
1. 몽고디비 설치 (npm i mongodb)
2. mongodb 접속하기 app > page.tsx 에 적으면 커넥트가 계속 일어나서 서버에 부하가 온다. 따라서 서버 띄울때 1번만 실행 시켜야한다.
    - 루트에 util 폴더 생성후 database.js 파일 생성 > 그안에 코드 적기
    - 이코드는 외부에 노출되어서는 안돼므로 환경변수로 관리
3. DEPLOYMENT > Database > connect > Connect to your application > application code 에서 주는 주소 복사
4. 2안에 주소에 넣고 디비 비밀번호 적어주기
5. 필요한 부분에 2에서 export한 ```connectDB ``` 가져다 쓰기
    - 몽고디비는 await를 붙여야하므로 function 에 async 를 꼭 써 주어야 한다.

# 게시판 기능 개발하기

1. 글목록 조회
2. 상세페이지
3. 글발행기능
4. 수정삭제