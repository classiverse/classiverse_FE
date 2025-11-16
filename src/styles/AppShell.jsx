import { useState } from 'react';
import styled from 'styled-components';

// Capacitor 플랫폼 감지 함수
const isCapacitor = () => {
  return typeof window !== 'undefined' && window.Capacitor;
};

const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

const Page = styled.div`
  width: 100vw;
  height: 100dvh; /* 데스크톱/모바일 모두 가득 */
  display: grid;
  place-items: center;
  background: #070707;
  overflow: hidden;
`;

/* 폰 화면 (iPhone SE 375×667 또는 iPhone 14 Pro 393×852 비율 유지) */
const PhoneFrame = styled.div`
  /* 핵심: 한쪽만 지정 + aspect-ratio 로 다른 축을 자동 계산 */
  aspect-ratio: 393 / 852;
  /* 세로를 기준으로 채우되, 가로를 넘치지 않도록 클램프 */
  width: min(100vw, calc(100dvh * (393 / 852)));
  /* height는 aspect-ratio에 따라 자동 계산됨 */
  max-width: 393px; /* 최대 너비 제한 */
  background: #070707;
  overflow-x: hidden; /* 가로 스크롤 방지 */
  overflow-y: auto; /* 세로 스크롤 허용 */
  position: relative; /* 내부 absolute 기준 */
  box-sizing: border-box;
  
  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

/* 모바일 전체 화면 (실제 앱에서 사용) */
const MobileFrame = styled.div`
  width: 100vw;
  height: 100vh; /* 폴백 */
  height: 100dvh; /* 주소창 변화 대응 */
  background: #070707;
  overflow-x: hidden; /* 가로 스크롤 방지 */
  overflow-y: auto; /* 세로 스크롤 허용 */
  position: relative;
  box-sizing: border-box;
  
  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  
  /* iOS 안전영역 - 데스크톱/웹에서는 0이므로 문제 없음 */
  padding-top: max(0px, env(safe-area-inset-top));
  padding-right: max(0px, env(safe-area-inset-right));
  padding-bottom: max(0px, env(safe-area-inset-bottom));
  padding-left: max(0px, env(safe-area-inset-left));
  
  /* 내부 콘텐츠가 padding을 고려하여 전체 너비 사용 */
  & > * {
    width: 100%;
    box-sizing: border-box;
  }
`;

export default function AppShell({ children }) {
  // 초기 렌더링 시 즉시 플랫폼 감지 (useEffect 지연 없이)
  // useState의 초기값으로 함수를 전달하면 초기 렌더링 시 한 번만 실행됨
  const [isNative] = useState(() => isCapacitor());
  const [isMobile] = useState(() => isMobileDevice());

  // Capacitor 네이티브 앱이거나 모바일 브라우저면 전체 화면 사용
  if (isNative || isMobile) {
    return (
      <MobileFrame>{children}</MobileFrame>
    );
  }

  // 데스크톱 브라우저에서는 PhoneFrame으로 모바일 크기 미리보기
  return (
    <Page>
      <PhoneFrame>{children}</PhoneFrame>
    </Page>
  );
}
