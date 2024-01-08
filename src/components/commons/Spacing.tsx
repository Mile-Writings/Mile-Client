import { FC } from 'react';

import styled from '@emotion/styled';

interface SpacingProps {
  marginBottom?: string;
}

const Spacing: FC<SpacingProps> = ({ marginBottom }) => {
  return <SpacingBox marginBottom={marginBottom} />;
};

export default Spacing;

const SpacingBox = styled.div<SpacingProps>`
  margin-bottom: ${(props) => props.marginBottom || '0'};
`;
