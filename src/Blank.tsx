import { FC } from 'react';

import styled from '@emotion/styled';

interface BlankProps {
  marginBottom?: string;
}

const Blank: FC<BlankProps> = ({ marginBottom }) => {
  return <BlankBox marginBottom={marginBottom} />;
};

export default Blank;

const BlankBox = styled.div<BlankProps>`
  margin-bottom: ${(props) => props.marginBottom || '0'};
`;
