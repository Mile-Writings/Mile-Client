import styled from '@emotion/styled';
import { MOBILE_MEDIA_QUERY } from '../../styles/mediaQuery';

interface SpacingPropTypes {
  marginBottom: string;
  mobileMarginBottom?: string;
}

const Spacing = (spacingProps: SpacingPropTypes) => {
  const { marginBottom, mobileMarginBottom = '' } = spacingProps;
  return <SpacingBox $marginBottom={marginBottom} $mobileMarginBottom={mobileMarginBottom} />;
};

export default Spacing;

const SpacingBox = styled.div<{ $marginBottom: string; $mobileMarginBottom: string }>`
  margin-bottom: ${(props) => props.$marginBottom || '0'}rem;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: ${(props) => props.$mobileMarginBottom || props.$marginBottom}rem;
  }
`;
