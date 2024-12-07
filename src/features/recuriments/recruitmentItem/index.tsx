import styled from '@emotion/styled';
import { Heart, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { useLikeStore } from '~/stores/likes';
import { Recruitment } from '~/types/recruitment';

function RecruitmentItem(props: Recruitment) {
  const { id, company_name, title, badge: badgeList, country } = props;
  const { toggleLike, isLiked } = useLikeStore();

  const handleToggleLike = () => {
    toggleLike(id);
  };
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
        <LikeButton onClick={handleToggleLike} aria-label={isLiked(id) ? '좋아요 취소' : '좋아요'}>
          <AnimatePresence mode="wait">
            <motion.div
              key={isLiked(id) ? 'liked' : 'unliked'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Heart
                size={24}
                fill={isLiked(id) ? '#00c471' : 'transparent'}
                color={isLiked(id) ? 'white' : '#00c471'}
              />
            </motion.div>
          </AnimatePresence>
        </LikeButton>
        <ImageWrapper>
          <img
            src={`https://api.dicebear.com/9.x/glass/svg?seed=${company_name}`}
            alt={company_name}
          />
        </ImageWrapper>
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
  gap: 12px;

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
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  margin-left: auto;
`;

const ImageWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 6px;
  overflow: hidden;
`;

const LikeButton = styled(motion.button)`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
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

  @media screen and (max-width: 768px) {
    gap: 4px;
    margin: 4px 0;
  }
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

  @media screen and (max-width: 768px) {
    font-size: 12px;
    padding: 4px 8px;
  }
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
