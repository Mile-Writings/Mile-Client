import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';

import { CreateGroupCongrats } from '../../assets/svgs';
import { AuthorizationHeader, UnAuthorizationHeader } from '../../components/commons/Header';
import { copyLink } from '../../utils/copyLink';

const CreateGroupSuccess = () => {
  const token = localStorage.getItem('accessToken');
  const { groupId } = useParams();

  const navigate = useNavigate();

  const handleCopyLink = async () => {
    copyLink(`https://www.milewriting.com/group/${groupId}/groupInvite`);
  };

  return (
    <CreateGroupSuccessWrapper>
      {token ? <AuthorizationHeader /> : <UnAuthorizationHeader />}
      <CreatGroupSection>
        <TitleWrapper>
          <MainTitle>글 모임 생성을 축하해요!</MainTitle>
          <SubTitle>초대 링크 복사 후, 생성된 글 모임 페이지를 확인해볼까요?</SubTitle>
        </TitleWrapper>
        <CreateGroupCongratsImg />
        <ButtonWrapper>
          <CopyLinkBtn onClick={handleCopyLink}>초대 링크 복사하기</CopyLinkBtn>
          <NavigateGroupPageBtn onClick={() => navigate(`/group/${groupId}`)}>
            글 모임 페이지로 이동하기
          </NavigateGroupPageBtn>
        </ButtonWrapper>
      </CreatGroupSection>
    </CreateGroupSuccessWrapper>
  );
};

export default CreateGroupSuccess;

const CreateGroupCongratsImg = styled(CreateGroupCongrats)`
  width: 40.8rem;
  height: 29.2rem;
`;
const CreateGroupSuccessWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  background-color: ${({ theme }) => theme.colors.backGroundGray};
`;

const CreatGroupSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  align-items: center;
  width: 72rem;
  padding: 6.4rem 0;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const MainTitle = styled.h1`
  color: ${({ theme }) => theme.colors.mainViolet};
  ${({ theme }) => theme.fonts.title2};
`;

const SubTitle = styled.h2`
  color: ${({ theme }) => theme.colors.gray90};
  ${({ theme }) => theme.fonts.subtitle4};
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Btn = styled.button`
  width: 61.5rem;
  height: 5rem;

  ${({ theme }) => theme.fonts.button3};
  border: 1px solid ${({ theme }) => theme.colors.mainViolet};
  border-radius: 5px;
`;

const CopyLinkBtn = styled(Btn)`
  color: ${({ theme }) => theme.colors.white};

  background-color: ${({ theme }) => theme.colors.mainViolet};
`;

const NavigateGroupPageBtn = styled(Btn)`
  color: ${({ theme }) => theme.colors.mainViolet};

  background-color: ${({ theme }) => theme.colors.white};
`;
