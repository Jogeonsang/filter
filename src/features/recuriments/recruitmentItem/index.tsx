import styled from '@emotion/styled';
import { MapPin } from 'lucide-react';

import { Recruitment } from '~/types/recruitment';

function RecruitmentItem(props: Recruitment) {
  const { company_name, title, badge: badgeList, country, image_url } = props;
  return (
    <Wrapper>
      <InfoSection>
        <Company>{company_name}</Company>
        <Title>{title}</Title>

        <BadgeWrapper>
          {badgeList.map((badge, index) => (
            <Badge key={index}>{badge}</Badge>
          ))}
        </BadgeWrapper>

        <Location>
          <MapPin size={16} fill="white" color="#00c471" />
          <Country>{country}</Country>
        </Location>
      </InfoSection>
      <ActionSection>
        <div>
          <img src={image_url} alt={company_name} />
        </div>
      </ActionSection>
    </Wrapper>
  );
}

export default RecruitmentItem;

const Wrapper = styled.li`
  display: flex;

  padding: 12px 0;
  border-bottom: 1px solid #e0e0e0;
  justify-content: space-between;

  &:last-child {
    border-bottom: none;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ActionSection = styled.div`
  margin-left: auto;
`;
const Title = styled.p`
  font-size: 16px;
  font-weight: 700;
`;

const Company = styled.p`
  font-size: 14px;
  color: #828282;
`;

const BadgeWrapper = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 8px 0;
`;

const Badge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  background-color: #f5f5f5;
  color: #666;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.2;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e9e9e9;
  }

  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);

  border: 1px solid rgba(0, 0, 0, 0.05);

  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  cursor: default;
  user-select: none;

  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.02),
    0 1px 2px rgba(0, 0, 0, 0.03);
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Country = styled.span`
  font-size: 14px;
  color: #828282;
`;
