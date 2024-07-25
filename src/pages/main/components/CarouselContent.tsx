import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { MainGroupRoutingBtn as MainGroupRoutingBtnIcon } from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';

export interface groupContentPropTypes {
  topicName: string;
  imageUrl: string | null;
  postTitle: string;
  postContent: string;
  postId: string;
  groupId: string;
  isContainPhoto: boolean;
  isLast: boolean;
}

const CarouselContent = ({
  topicName,
  imageUrl,
  postTitle,
  postContent,
  groupId,
  postId,
  isLast,
  isContainPhoto,
}: groupContentPropTypes) => {
  const navigate = useNavigate();
  const handleRoutingDetail = () => {
    navigate(`/detail/${groupId}/${postId}`);
  };

  const handleRoutingGroup = () => {
    navigate(`/group/${groupId}`);
  };

  return (
    <CarouselWrapper>
      <CarouselContentLayout>
        <ContentContainer onClick={handleRoutingDetail}>
          <Topic>{topicName}</Topic>
          <Title>{postTitle}</Title>
          <Spacing marginBottom="2" />
          <SubText isLast={isLast} isContainPhoto={isContainPhoto}>
            {postContent}
          </SubText>
        </ContentContainer>
        {isContainPhoto && (
          <Image
            src={imageUrl || ''}
            isLast={isLast}
            alt={`${groupId}-content-image`}
            onClick={handleRoutingDetail}
          />
        )}
      </CarouselContentLayout>
      {isLast && (
        <GroupRoutingBtnLayout>
          <GroupRoutingText>
            이 모임에 대해서
            <br /> 더 궁금하신가요?
          </GroupRoutingText>
          <Spacing marginBottom="1.6" />
          <GroupRoutingBtnBox>
            <MainGroupRoutingBtnIcon onClick={() => handleRoutingGroup()} />
          </GroupRoutingBtnBox>
        </GroupRoutingBtnLayout>
      )}
    </CarouselWrapper>
  );
};

export default CarouselContent;

const CarouselWrapper = styled.section`
  display: flex;
`;

const CarouselContentLayout = styled.div`
  display: flex;
  gap: 3.6rem;
  padding: 3.6rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
`;

const Topic = styled.h1`
  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.body6};
`;

const Title = styled.h2`
  ${({ theme }) => theme.fonts.title10};
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  cursor: pointer;
`;

const SubText = styled.span<{ isContainPhoto: boolean; isLast: boolean }>`
  width: ${({ isContainPhoto, isLast }) =>
    isContainPhoto && isLast
      ? '47.8rem'
      : isContainPhoto && !isLast
        ? '59.8rem'
        : !isContainPhoto && isLast
          ? '68.2rem'
          : '85.8rem'};
  height: 8.5rem;
  overflow: hidden;

  color: ${({ theme }) => theme.colors.gray80};
  text-overflow: ellipsis;

  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;

  ${({ theme }) => theme.fonts.body3};
`;

const Image = styled.img<{ isLast: boolean }>`
  width: ${({ isLast }) => (isLast ? '16.8rem' : '22.4rem')};
  height: 16.8rem;
  object-fit: cover;

  cursor: pointer;
  border-radius: 8px;
`;

const GroupRoutingBtnLayout = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 5rem;

  text-align: center;
`;

const GroupRoutingText = styled.p`
  width: 12.3rem;

  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.title8};
`;

const GroupRoutingBtnBox = styled.div`
  & > svg {
    cursor: pointer;
  }

  & > svg:hover {
    path {
      fill: ${({ theme }) => theme.colors.mileViolet};
    }
  }
`;
