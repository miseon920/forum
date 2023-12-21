'use server'

export async function handleSubmit(formData: any) { 
    'use server'  //서버에서 쓰는 api가 된다. async를 붙여줘야 한다. - 유저에게는 안보임
    console.log('클라이언트컴포넌트에서 갖다쓰기 제목: ',formData.get('title')); // 타이틀을 가져올 수 있다.
}