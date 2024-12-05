import styled from '@emotion/styled';
import { Rabbit } from 'lucide-react';

function EmptyRecruitments() {
  return (
    <EmptyRecruitmentsContainer>
      <Rabbit size={100} color="#00c471" />
      <Text>검색 결과가 없습니다.</Text>
    </EmptyRecruitmentsContainer>
  );
}

export default EmptyRecruitments;

const EmptyRecruitmentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Text = styled.div`
  font-size: 20px;
  font-weight: 700;
`;
