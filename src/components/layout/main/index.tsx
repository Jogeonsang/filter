import styled from '@emotion/styled';
import type { PropsWithChildren } from 'react';

export const Main = ({ children }: PropsWithChildren) => <MainContainer>{children}</MainContainer>;

const MainContainer = styled.section`
  height: 100vh;
  background-color: #ffffff;
  display: flex;
`;
