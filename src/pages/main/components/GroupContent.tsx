import styled from '@emotion/styled';

import Spacing from '../../../components/commons/Spacing';
import { groupContentypes } from '../constants/constants';

const GroupContent = ({ topic, maintext, subtext, image }: groupContentypes) => {
  const hasImage = () => {
    return image !== null;
  };

  return (
    <TextContainer>
      <Topic>{topic}</Topic>
      <MainText>{maintext}</MainText>
      <Spacing marginBottom="3.2" />
      <ImageWithTextBox>
        <SubText isImage={hasImage()}>{subtext}</SubText>
        {image !== null ? <Image src={image} alt="group-content-image" /> : <></>}
      </ImageWithTextBox>
    </TextContainer>
  );
};

export default GroupContent;

const TextContainer = styled.div`
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

const ImageWithTextBox = styled.div``;

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
  left: 66.5rem;
`;
