import styled from '@emotion/styled';
import { CloseIcn } from '../../../../assets/svgs/editorSVG';
import { useParams, useNavigate } from 'react-router-dom';
import { MOBILE_MEDIA_QUERY } from '../../../../styles/mediaQuery';

interface MobileHeaderPropType {
  onClickTempSave?: () => void;
  onClickSubmit?: () => void;
  onClickEditSave?: () => void;
}

// 임시저장, 제출
// 임시저장 글 존재 X -> 에디터 창에서 글을 쓰고 있을 때
export const MobileTempNotExistHeader = (props: MobileHeaderPropType) => {
  const { onClickTempSave, onClickSubmit } = props;

  const { groupId } = useParams() as { groupId: string };
  const navigate = useNavigate();

  const onClickCloseBtn = () => {
    navigate(`/group/${groupId}`);
  };

  return (
    <Header>
      <CloseIcon onClick={onClickCloseBtn} />
      <SaveBtnContainer>
        <TempSaveBtn onClick={onClickTempSave}>임시저장</TempSaveBtn>
        <SaveBtn onClick={onClickSubmit}>제출</SaveBtn>
      </SaveBtnContainer>
    </Header>
  );
};

// 제출만 있음
// 임시저장 글 존재 O -> 에디터 창에서 글을 쓰고 있을 때
export const MobileTempExistHeader = (props: MobileHeaderPropType) => {
  const { onClickSubmit } = props;

  const { groupId } = useParams() as { groupId: string };
  const navigate = useNavigate();

  const onClickCloseBtn = () => {
    navigate(`/group/${groupId}`);
  };

  return (
    <Header>
      <CloseIcon onClick={onClickCloseBtn} />
      <SaveBtnContainer>
        <SaveBtn onClick={onClickSubmit}>제출</SaveBtn>
      </SaveBtnContainer>
    </Header>
  );
};

// 수정
// 에디터 창에서 글을 수정하고 있을 때 헤더
// 디자인 워딩 반영 필요
export const MobileEditHeader = (props: MobileHeaderPropType) => {
  const { onClickEditSave } = props;

  const { groupId } = useParams() as { groupId: string };
  const navigate = useNavigate();

  const onClickCloseBtn = () => {
    navigate(`/group/${groupId}`);
  };

  return (
    <Header>
      <CloseIcon onClick={onClickCloseBtn} />
      <SaveBtnContainer>
        <SaveBtn onClick={onClickEditSave}>수정하기</SaveBtn>
      </SaveBtnContainer>
    </Header>
  );
};

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 5.6rem;
  padding: 1rem 2rem;

  background-color: ${({ theme }) => theme.colors.white};

  @media ${MOBILE_MEDIA_QUERY} {
    max-width: 85rem;
  }
`;

const CloseIcon = styled(CloseIcn)`
  cursor: pointer;
`;

const SaveBtnContainer = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;
`;
const TempSaveBtn = styled.div`
  color: ${({ theme }) => theme.colors.gray70};

  ${({ theme }) => theme.fonts.mSubtitle4};
  cursor: pointer;
`;

const SaveBtn = styled.div`
  color: ${({ theme }) => theme.colors.mainViolet};
  ${({ theme }) => theme.fonts.mSubtitle4};

  cursor: pointer;
`;
