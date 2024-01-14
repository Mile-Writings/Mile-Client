import styled from '@emotion/styled';

import Curious from './CuriousGroup';

import Spacing from './.././../../components/commons/Spacing';
import { MoimPostPropTypes } from './../constants/constants';

const GroupContent = ({
  topicName,
  imageUrl,
  postTitle,
  postContent,
  isLast,
}: MoimPostPropTypes & { isLast: boolean }) => {
  const hasImage = () => {
    return imageUrl !== null;
  };

  return (
    <ContentLayout>
      <TextContainer>
        <Topic>{topicName}</Topic>
        <MainText>{postTitle}</MainText>
        <Spacing marginBottom="2" />
        <SubText isImage={hasImage()} isLast={isLast}>
          {postContent}
        </SubText>
      </TextContainer>
      {imageUrl && <Image src={imageUrl} isLast={isLast} alt="group-content-image" />}
      {isLast && <Curious />}
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
`;

const SubText = styled.p<{ isImage: boolean; isLast: boolean }>`
  display: -webkit-box;
  width: ${({ isImage, isLast }) =>
    isImage && isLast
      ? '47.8rem'
      : isImage && !isLast
        ? '59.8rem'
        : !isImage && isLast
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

  border-radius: 8px;
`;
