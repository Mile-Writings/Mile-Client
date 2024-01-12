import styled from '@emotion/styled';

const EditorDropdown = () => {
  return (
    <EditorDropdownWrapper>
      <WritingStyleWrapper>웹잼에 대해서</WritingStyleWrapper>
      <WritingNameWrapper>필명</WritingNameWrapper>
    </EditorDropdownWrapper>
  );
};

export default EditorDropdown;

const EditorDropdownWrapper = styled.div`
  display: flex;
  width: 73.4rem;
  height: 4.4rem;

  border: 1px solid red;
`;

const WritingStyleWrapper = styled.div`
  width: 36rem;
  height: 4.4rem;
  margin-right: 1.2rem;

  border: 1px solid yellow;
`;
const WritingNameWrapper = styled.div`
  width: 14.6rem;
  height: 4.4rem;

  border: 1px solid purple;
`;
