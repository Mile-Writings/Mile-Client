import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import CuriousGroup from './CuriousGroup';

import Spacing from './.././../../components/commons/Spacing';

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

const GroupContent = ({
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
  const handleOnClick = () => {
    navigate(`/detail/${groupId}/${postId}`);
  };

  return (
    <ContentLayout>
      {imageUrl && (
        <>
          <TextContainer onClick={handleOnClick}>
            <Topic>{topicName}</Topic>
            <MainText>{postTitle}</MainText>
            <Spacing marginBottom="2" />
            <SubText isLast={isLast} isContainPhoto={isContainPhoto}>
              {postContent}
            </SubText>
          </TextContainer>
          {isContainPhoto && (
            <Image
              src={imageUrl}
              isLast={isLast}
              alt="group-content-image"
              onClick={handleOnClick}
            />
          )}
        </>
      )}
      {isLast && <CuriousGroup groupId={groupId} />}
    </ContentLayout>
  );
};

export default GroupContent;

const ContentLayout = styled.div`
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

const TextContainer = styled.div`
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
