import styled from '@emotion/styled';
import React from 'react';
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

  const handleRoutingGroup = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();
    navigate(`/group/${groupId}`);
  };

  return (
    <CarouselContentWrapper>
      {imageUrl && (
        <>
          <ContentLayout onClick={handleRoutingDetail}>
            <Topic>{topicName}</Topic>
            <MainText>{postTitle}</MainText>
            <Spacing marginBottom="2" />
            <SubText isLast={isLast} isContainPhoto={isContainPhoto}>
              {postContent}
            </SubText>
          </ContentLayout>
          {isContainPhoto && (
            <Image
              src={imageUrl}
              isLast={isLast}
              alt="group-content-image"
              onClick={handleRoutingDetail}
            />
          )}
        </>
      )}
      {isLast && (
        <GroupRoutingBtnLayout>
          <GroupRoutingBox>
            이 모임에 대해서
            <br /> 더 궁금하신가요?
          </GroupRoutingBox>
          <Spacing marginBottom="1.6" />
          <GroupRoutingBtnBox>
            <MainGroupRoutingBtnIcon onClick={(e) => handleRoutingGroup(e)} />
          </GroupRoutingBtnBox>
        </GroupRoutingBtnLayout>
      )}
    </CarouselContentWrapper>
  );
};

export default CarouselContent;

const CarouselContentWrapper = styled.div`
  display: flex;
  gap: 3.6rem;
  padding: 3.6rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
`;

const Topic = styled.div`
  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.body6};
`;

const MainText = styled.p`
  ${({ theme }) => theme.fonts.title10};
`;

const ContentLayout = styled.div`
  display: flex;
  flex-direction: column;

  cursor: pointer;
`;

const SubText = styled.p<{ isContainPhoto: boolean; isLast: boolean }>`
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
  padding-left: 4.2rem;

  text-align: center;
`;

const GroupRoutingBox = styled.p`
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
