import styled from '@emotion/styled';
import { useState } from 'react';

import { CommonLayout } from './components/layout';
import Filter from './features/filter';
import Recuriments from './features/recuriments';
import { FilterOptions } from './types/recruitment';

function App() {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    region: '',
    employment_type: '',
    career: '',
    working_hours_per_week: '',
    occupation: '',
  });

  return (
    <CommonLayout>
      <Wrapper>
        <Filter filterOptions={filterOptions} onFilterChange={setFilterOptions} />
        <Recuriments filterOptions={filterOptions} />
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
