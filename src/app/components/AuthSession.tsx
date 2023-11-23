'use client';
import { SessionProvider } from "next-auth/react";

type Props = ({
  children: React.ReactNode;
  });

export default function AuthSession({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}


/*
useSession이라는 리액트 훅을 통해 접근할 수 있으며,
그를 위해 나의 애플리케이션의 최상위 레벨에 세션 컨텍스트인 <SessionProvider />로 감싸두어야 한다.
layout.tsx 에서 감싸야 하나 레이아웃은 ssr을 사용하기 때문에 메타데이터를 가져올때 상태가 필요한 프로바이더와 충돌하므로
여기에 쓰고 이것을 layout.tsx에 안에 넣어준다.
*/