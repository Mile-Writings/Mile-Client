import styled from '@emotion/styled';

interface SpacingPropTypes {
  marginBottom: string;
}

const Spacing = (props: SpacingPropTypes) => {
  const { marginBottom } = props;
  return <SpacingBox $marginBottom={marginBottom} />;
};

export default Spacing;

const SpacingBox = styled.div<{ $marginBottom: string }>`
  margin-bottom: ${(props) => props.$marginBottom || '0'};
`;
