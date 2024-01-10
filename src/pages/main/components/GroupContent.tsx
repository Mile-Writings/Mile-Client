import styled from '@emotion/styled';

import Spacing from './.././../../components/commons/Spacing';
import { groupContentypes } from './../constants/constants';
import Curious from './Curious';

const GroupContent = ({ topic, maintext, subtext, image, isLast }: groupContentypes) => {
  const hasImage = () => {
    return image !== null;
  };

  return (
    <ContentLayout>
      <TextContainer>
        <Topic>{topic}</Topic>
        <MainText>{maintext}</MainText>
        <Spacing marginBottom="3.2" />
        <SubText isImage={hasImage()} isLast={isLast}>
          {subtext}
        </SubText>
      </TextContainer>
      {image && <Image src={image} isLast={isLast} alt="group-content-image" />}
      {isLast && <Curious />}
    </ContentLayout>
  );
};

export default GroupContent;

const ContentLayout = styled.div`
  display: flex;
  padding: 3.6rem;
  gap: 3.6rem;
`;

const Topic = styled.div`
  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.body6};
`;

const MainText = styled.div`
  ${({ theme }) => theme.fonts.title10};
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubText = styled.div<{ isImage: boolean; isLast: boolean }>`
  width: ${({ isImage, isLast }) =>
    isImage && isLast
      ? '47.8rem'
      : isImage && !isLast
        ? '59.8rem'
        : !isImage && isLast
          ? '68.2rem'
          : '85.8rem'};
  height: 8.4rem;
  overflow: hidden;

  color: ${({ theme }) => theme.colors.gray80};
  ${({ theme }) => theme.fonts.body3};
`;

const Image = styled.img<{ isLast: boolean }>`
  width: ${({ isLast }) => (isLast ? '16.8rem' : '22.4rem')};
  height: 16.8rem;
`;
