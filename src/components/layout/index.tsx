import styled from '@emotion/styled';
import { memo, type ReactNode } from 'react';

import { Main } from './main';

type CommonLayoutProps = {
  prefix?: ReactNode;
  suffix?: ReactNode;
  title?: string;
  children: ReactNode;
};

export const CommonLayout = memo(({ prefix, suffix, title, children }: CommonLayoutProps) => (
  <RootContainer>
    <RootWrapper>
      {/* 
    // 추후 헤더 추가 시 사용
    <Header prefix={prefix} suffix={suffix} title={title} /> 
    */}
      <Main>{children}</Main>
      {/* 
    // 추후 푸터 추가 시 사용
    <Footer /> 
    */}
    </RootWrapper>
  </RootContainer>
));

const RootContainer = styled.div`
  width: 100vw;
  background-color: rgb(239, 240, 240);
`;

const RootWrapper = styled.div`
  max-width: 1080px;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1);
  position: relative;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  min-width: 1024px;
  margin: 0px auto;

  transition: max-width 0.24s;

  /* 모바일 스타일 (768px 미만) */
  @media screen and (max-width: 767px) {
    width: 100%;
    max-width: 100%;
    min-width: 0;
  }
`;
