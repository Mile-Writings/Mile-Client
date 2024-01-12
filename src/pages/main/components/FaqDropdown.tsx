import styled from '@emotion/styled';

const FaqDropdown = () => {
  return (
    <DropdownWrapper>
      <QuestionMarkText>Q.</QuestionMarkText>
      <QuestionText>작자미상으로 글을 써도 다른 사람들이 알 수 있나요?</QuestionText>
    </DropdownWrapper>
  );
};

export default FaqDropdown;

const DropdownWrapper = styled.section``;

const QuestionMarkText = styled.p``;

const QuestionText = styled.p``;
