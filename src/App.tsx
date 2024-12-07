import styled from '@emotion/styled';

import { CommonLayout } from './components/layout';
import Filter from './features/filter';
import Recuriments from './features/recuriments';

function App() {
  return (
    <CommonLayout>
      <Wrapper>
        <Filter />
        <Recuriments />
      </Wrapper>
    </CommonLayout>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 24px;

  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
`;
