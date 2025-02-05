import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { MainGroupRoutingBtn as MainGroupRoutingBtnIcon } from '../../../assets/svgs';
import Responsive from '../../../components/commons/Responsive/Responsive';
import Spacing from '../../../components/commons/Spacing';
import { MOBILE_MEDIA_QUERY } from '../../../styles/mediaQuery';
import { replaceDefaultImg } from '../../../utils/replaceDefaultImg';
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
          <Spacing marginBottom="0.4" />
          <Title>{postTitle}</Title>

          <SubText isLast={isLast} isContainPhoto={isContainPhoto}>
            {postContent}
          </SubText>
        </ContentContainer>
        <Responsive only="desktop" asChild>
          {isContainPhoto && (
            <Image
              src={imageUrl || ''}
              isLast={isLast}
              alt={`썸네일 이미지`}
              onClick={handleRoutingDetail}
              onError={replaceDefaultImg}
            />
          )}
        </Responsive>
      </CarouselContentLayout>

      {isLast && (
        <LastSlideBtnLayout>
          <GroupRoutingText>
            이 모임에 대해서
            <br /> 더 궁금하신가요?
          </GroupRoutingText>
          <Spacing marginBottom="1.6" />
          <GroupRoutingBtnBox>
            <MainGroupRoutingBtnIcon onClick={handleRoutingGroup} />
          </GroupRoutingBtnBox>
        </LastSlideBtnLayout>
      )}
    </CarouselWrapper>
  );
};

export default CarouselContent;

const CarouselWrapper = styled.section`
  display: flex;
  gap: 5rem;
  width: 93rem;
`;

const CarouselContentLayout = styled.div`
  display: flex;
  gap: 3.6rem;
  height: 24rem;
  padding: 3.6rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;

  @media ${MOBILE_MEDIA_QUERY} {
    height: 29rem;
    padding: 1.8rem;
  }
`;

const Topic = styled.h1`
  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.body6};

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.mSubtitle1};
  }
`;

const Title = styled.h2`
  ${({ theme }) => theme.fonts.title10};
  line-height: 120%;

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.mTitle1};
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SubText = styled.span<{ isContainPhoto: boolean; isLast: boolean }>`
  display: -webkit-box;
  width: ${({ isContainPhoto, isLast }) =>
    isContainPhoto && isLast
      ? '47.8rem'
      : isContainPhoto && !isLast
        ? '59.8rem'
        : !isContainPhoto && isLast
          ? '68.2rem'
          : '85.8rem'};
  height: 8.5rem;
  margin-top: 3.1rem;
  overflow: hidden;

  color: ${({ theme }) => theme.colors.gray80};
  text-align: left;
  text-overflow: ellipsis;
  word-wrap: break-word;

  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;

  ${({ theme }) => theme.fonts.body3};
  @media ${MOBILE_MEDIA_QUERY} {
    width: 40rem;
    height: ${({ isContainPhoto }) => (isContainPhoto ? 6.4 : 19.8)}rem;
    margin-top: 1rem;
    -webkit-line-clamp: ${({ isContainPhoto }) => (isContainPhoto ? 3 : 9)};
    margin-bottom: 1.4rem;
  }
`;

const Image = styled.img<{ isLast: boolean }>`
  width: ${({ isLast }) => (isLast ? '16.8rem' : '22.4rem')};
  height: 16.8rem;
  object-fit: cover;

  border-radius: 8px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 22.4rem;
    height: 11.2rem;
  }
`;

const LastSlideBtnLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  text-align: center;

  cursor: default;
`;

const GroupRoutingText = styled.p`
  width: 12.3rem;

  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.title8};
`;

const GroupRoutingBtnBox = styled.div`
  cursor: pointer;

  & > svg:hover {
    path {
      fill: ${({ theme }) => theme.colors.mileViolet};
    }
  }
`;
