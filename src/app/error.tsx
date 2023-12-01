'use client'

export default function Error({error, reset}: any) { 
    // props = error, reset이라는 props가 들어옴
    // error = 어떤 에러인지 보여줌, rest은 함수로 페이지를 다시 로드시킨다.
    // error가 나도 다른페이지는 이동할 수 있다는 장점이 있다.
    // 현재 폴더에 error.tsx가 없다면 상위폴더에서 error.tsx를 찾아서 보여준다. - 모든페이지에 만들다기보다는 app폴더 하위에 보통 만든다.
    // error.tsx는 layout.tsx에서 나는 에러는 잡지 못한다. 이때 global-error.tsx를 만들면 최상위 layout.tsx에서 나는 에러도 체크가 가능하다.
    return (
        <div className="list-bg">
            <div>Error...</div>
            <button onClick={()=>{reset()}}>초기화</button>
        </div>
    );
  }