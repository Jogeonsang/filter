import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, RotateCcw } from 'lucide-react';
import { useLayoutEffect, useState } from 'react';

import { Checkbox } from '~/components/checkbox';
import Collapse from '~/components/collapse';
import { FILTER_CONSTANTS } from '~/constants/filter';
import useDevice from '~/hooks/useDevice';
import { useFilterStore } from '~/stores/filter';

function Filter() {
  const { isMobile } = useDevice();
  const [isOpen, setIsOpen] = useState(isMobile);
  const { filterOptions, openSections, updateFilter, toggleSection, resetFilter } =
    useFilterStore();

  useLayoutEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

  const handleOptionChange = (headerKey: string, optionValue: string) => {
    updateFilter({
      ...filterOptions,
      [headerKey]: filterOptions[headerKey] === optionValue ? '' : optionValue,
    });
  };

  return (
    <Wrapper>
      {isMobile && (
        <FilterOpenButton onClick={() => setIsOpen(prev => !prev)}>
          {isOpen ? '모든 필터 닫기' : '모든 필터 보기'}
        </FilterOpenButton>
      )}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <TitleWrapper>
              <Title>채용공고 검색 조건</Title>
              <IconButton onClick={resetFilter} whileTap={{ rotate: -30 }}>
                <RotateCcw
                  size={20}
                  color={
                    Object.values(filterOptions).some(value => value !== '') ? '#00c471' : '#999'
                  }
                />
              </IconButton>
            </TitleWrapper>
            {FILTER_CONSTANTS.search_header.map((header, index) => (
              <Section key={index}>
                <SectionHeader onClick={() => toggleSection(header.key)}>
                  <SectionTitle>{header.value}</SectionTitle>
                  <motion.div
                    animate={{ rotate: openSections[header.key] ? 0 : 180 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <ChevronUp size={20} color="#00c471" />
                  </motion.div>
                </SectionHeader>
                <Collapse isOpen={openSections[header.key]}>
                  <Options>
                    {FILTER_CONSTANTS.search_condition[index].map((option, idx) => (
                      <Option
                        key={idx}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.03 }}
                      >
                        <Checkbox
                          id={`${header.key}-${idx}`}
                          checked={filterOptions[header.key] === option.value}
                          onCheckedChange={() => handleOptionChange(header.key, option.value)}
                        />
                        <Label
                          htmlFor={`${header.key}-${idx}`}
                          isChecked={filterOptions[header.key] === option.value}
                        >
                          {option.value}
                        </Label>
                      </Option>
                    ))}
                  </Options>
                </Collapse>
              </Section>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </Wrapper>
  );
}

export default Filter;

const Wrapper = styled.nav`
  max-width: 292px;
  min-width: 260px;

  height: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;
  background-color: rgb(249, 250, 250);
  padding: 24px;

  overflow: auto;

  @media screen and (max-width: 767px) {
    width: 100%;
    max-width: 100%;
    height: auto;
    gap: 24px;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const IconButton = styled(motion.button)`
  cursor: pointer;
`;

const FilterOpenButton = styled.button`
  background-color: #fff;
  border: 1px solid #00c471;
  border-radius: 4px;
  padding: 8px 12px;
  color: #00c471;
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 500;
`;

const Section = styled.div`
  margin-bottom: 20px;

  border-bottom: 1px solid #e5e5e5;

  &:last-child {
    border-bottom: none;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 8px 0;
`;

const SectionTitle = styled.h4`
  font-size: 18px;
  font-weight: 500;
  color: rgb(100, 111, 122);
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 0;
  overflow: hidden;
  gap: 4px;
`;

const Option = styled(motion.div)`
  margin-bottom: 5px;
  display: flex;
  align-items: center;

  label {
    margin-left: 8px;
    cursor: pointer;
  }
`;

const Label = styled.label<{ isChecked: boolean }>`
  color: ${props => (props.isChecked ? '#00c471' : 'rgb(100, 111, 122)')};
  transition: color 0.2s ease;
`;
