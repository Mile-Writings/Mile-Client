import styled from '@emotion/styled';

import Spacing from '../../../components/commons/Spacing';
import { groupContentypes } from '../constants/constants';

const GroupContent = ({ topic, maintext, subtext, image }: groupContentypes) => {
  const hasImage = () => {
    return image !== null;
  };

  return (
    <ContentContainer>
      <Topic>{topic}</Topic>
      <MainText>{maintext}</MainText>
      <Spacing marginBottom="3.2" />
      <TextImageBox>
        <SubText isImage={hasImage()}>{subtext}</SubText>
        {image !== null ? (
          <Image src={image} alt="group-content-image" />
        ) : (
          image !== null && (
            <Image src={image} alt="group-content-image" style={{ display: 'none' }} />
          )
        )}
      </TextImageBox>
    </ContentContainer>
  );
};

export default GroupContent;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3.6rem;
`;

const Topic = styled.div`
  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.body6};
`;

const MainText = styled.div`
  ${({ theme }) => theme.fonts.title10};
`;

const TextImageBox = styled.div``;

const SubText = styled.div<{ isImage: boolean }>`
  width: ${({ isImage }) => (isImage ? '59.8rem' : '85.8rem')};
  height: 8.4rem;
  overflow: hidden;

  color: ${({ theme }) => theme.colors.gray80};
  ${({ theme }) => theme.fonts.body3};
`;

const Image = styled.img`
  width: 22.4rem;
  height: 16.8rem;
  position: absolute;
  top: 5rem;
  left: 66rem;
`;
