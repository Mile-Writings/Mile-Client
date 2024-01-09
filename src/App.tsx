import styled from '@emotion/styled';

import Button from '../src/components/atomComponents/Button';

const App = () => {
  return (
    <Header>
      <br />
      <br />
      <Button typeName="deleteTempType">임시저장</Button>
      <br />
      <br />
      <Button typeName="submitEditType">글 제출하기</Button>
      <br />
      <br />
      <Button typeName="disableCommentType">등록</Button>
      <br />
      <br />
      <Button typeName="enableCommentType">등록</Button>
      <br />
      <br />
    </Header>
  );
};

export default App;

const Header = styled.h1`
  margin-left: 5rem;
`;
