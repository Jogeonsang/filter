import styled from '@emotion/styled';
import { useEffect, useMemo, useRef, useState } from 'react';
import { match } from 'ts-pattern';

import { RECRUITMENTS } from '~/constants/recruments';
import { isCareerMatch } from '~/constants/util/recruiment';
import { useIntersectionObserver } from '~/hooks/useIntersectionObserver';
import { FilterOptions } from '~/types/recruitment';

import EmptyRecruitments from './empty';
import RecruitmentItem from './recruitmentItem';

interface RecurimentsProps {
  filterOptions: FilterOptions;
}

function Recuriments({ filterOptions }: RecurimentsProps) {
  const [page, setPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 필터 조건이 변경되면 페이지를 초기화
    setPage(1);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [filterOptions]);

  const filteredRecruitments = useMemo(() => {
    return RECRUITMENTS.filter(recruitment => {
      return Object.entries(filterOptions).every(([key, value]) => {
        if (!value) return true;

        if (key === 'career') {
          return isCareerMatch(value, recruitment.career);
        }

        return recruitment[key as keyof typeof recruitment] === value;
      });
    });
  }, [filterOptions]);

  const [ref] = useIntersectionObserver({
    threshold: 0.1,
    onChange: isIntersecting => {
      if (isIntersecting) {
        setPage(prevPage => prevPage + 1);
      }
    },
  });

  const recruitmentsToShow = filteredRecruitments.slice(0, page * 10);

  return (
    <RecurimentsContainer ref={containerRef}>
      <RecurimentWrapper>
        <RecurimentItemWrapper>
          {match(recruitmentsToShow.length)
            .with(0, () => <EmptyRecruitments />)
            .otherwise(() => (
              <>
                {recruitmentsToShow.map((recruitment, index) => (
                  <RecruitmentItem key={`recruitment-${index}`} {...recruitment} />
                ))}
                <div ref={ref} style={{ height: '1px' }} />
              </>
            ))}
        </RecurimentItemWrapper>
      </RecurimentWrapper>
    </RecurimentsContainer>
  );
}

export default Recuriments;

const RecurimentsContainer = styled.div`
  isolation: isolate;
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
`;

const RecurimentWrapper = styled.div`
  flex: 1;
  width: 100%;
  box-shadow:
    0px 0px 12px 0px rgba(0, 0, 0, 0.04),
    -1px 0px 0px 0px rgba(0, 0, 0, 0.04),
    0px 0px 24px 0px rgba(0, 0, 0, 0.04);
  height: 100%;
  padding: 40px;

  @media screen and (max-width: 767px) {
    padding: 24px;
  }
`;

const RecurimentItemWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
