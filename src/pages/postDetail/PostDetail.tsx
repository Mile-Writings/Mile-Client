import styled from '@emotion/styled';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Error from '../error/Error';
import { useGroupFeedAuth, useGroupFeedPublicStatus } from '../groupFeed/hooks/queries';
import Loading from '../loading/Loading';

import { replaceDefaultImg } from '../../utils/replaceDefaultImg';

import checkAuthenticate from '../../utils/checkAuthenticate';

import {
  CheckboxIc,
  DefaultProfileIc,
  GroupChatIc,
  GroupCuriousIc,
  GroupViewIc,
} from './../../assets/svgs';
import Button from './../../components/commons/Button';
import { AuthorizationHeader, UnAuthorizationHeader } from './../../components/commons/Header';
import Spacing from './../../components/commons/Spacing';
import Comment from './components/Comment';
import CuriousBtn from './components/CuriousBtn';
import { useCheckPostAuth, useDeletePost, useGetPostDetail } from './hooks/queries';
import { DefaultModal, DefaultModalBtn } from '../../components/commons/modal/DefaultModal';
import useModal from '../../hooks/useModal';
import { MODAL } from './constants/modalContent';

const PostDetail = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { groupId } = useParams();

  // 모달 연결 위한 state
  const [modalType, setModalType] = useState('');
  // modal 열고닫음
  const { isModalOpen, handleShowModal, handleCloseModal } = useModal();

  //글 삭제시 쿼리키 가져오기 위해서
  const location = useLocation();
  const topicId = location.state?.topicId;

  const {
    isPublic,
    isLoading: publicStatusLoading,
    isError: publicStatusError,
  } = useGroupFeedPublicStatus(groupId || '');
  const {
    isMember,
    isLoading: feedAuthLoading,
    isError: groupAuthError,
  } = useGroupFeedAuth(groupId || '');
  const { data, isError, isLoading } = useGetPostDetail(postId || '');
  const { data: postAuth } = useCheckPostAuth(postId || '');
  const { mutate: deletePost } = useDeletePost(postId || '', topicId);

  const postData = data?.data;
  const accessToken = localStorage.getItem('accessToken');
  const role = postAuth?.data.data.role;

  //글 작성 후 뒤로가기 하면 모임페이지로 이동하는 로직
  //메인페이지 -> 글 상세페이지 -> 뒤로가기 -> 글 모임페이지가 되어 UX에 좋은 영향을 끼치지 않는 부분도 있어서 추후 적용

  // const testFunc = () => {
  //   navigate(`/group/${groupId}`, { replace: true });
  // };
  // useCustomBack(testFunc);
  useEffect(() => {
    if (!publicStatusLoading && !feedAuthLoading) {
      if (!isPublic) {
        if (!checkAuthenticate() || role === 'anonymous') {
          alert('해당 글모임은 비공개 글모임입니다.');
          navigate('/');
        }
      }
    }
  }, [isPublic, role]);
  if (isLoading || publicStatusLoading || feedAuthLoading) {
    return <Loading />;
  }

  if (isError || publicStatusError || groupAuthError) {
    return <Error />;
  }

  // 삭제 모달 활성화 위한 버튼
  const handleDeleteBtn = () => {
    setModalType('DELETE');
    handleShowModal();
  };
  // 삭제 동작 버튼
  const handleDeletePost = () => {
    deletePost();
    navigate(`/group/${groupId}`);
  };

  // 수정 모달 활성화 위한 버튼
  const handleEditBtn = () => {
    setModalType('EDIT');
    handleShowModal();
  };
  // 수정 동작 버튼
  const handleEdit = () => {
    navigate(`/post/${groupId}/edit`, {
      state: {
        postId: postId,
        topic: postData?.topic,
        writer: postData?.writerName,
        title: postData?.title,
        content: postData?.content,
        imageUrl: postData?.imageUrl,
      },
    });
  };

  return (
    <>
      {accessToken ? <AuthorizationHeader /> : <UnAuthorizationHeader />}
      <Spacing marginBottom="6.4" />
      <ThumnailImg src={postData?.imageUrl} alt={'썸네일 이미지'} onError={replaceDefaultImg} />
      <Spacing marginBottom="4.8" />
      <PostDetailWrapper>
        <PostDetailContainer>
          <InfoTextBox>
            <TitleText>{postData?.title}</TitleText>
            <DetailBox>
              <DateText>{postData?.createdAt} </DateText>
              <DividingLine />
              <CuriousCount>
                <GroupCuriousIc />
                {postData?.curiousCount}
              </CuriousCount>
              <ViewCount>
                <GroupViewIc />
                {postData?.hitsCount}
              </ViewCount>
              <CommentCount>
                <GroupChatIc />
                {postData?.commentCount}
              </CommentCount>
            </DetailBox>
          </InfoTextBox>

          <ButtonWrapper role={role || ''}>
            {role === 'owner' || role === 'writer' ? (
              <>
                <Button typeName={'deleteTempType'} onClick={handleDeleteBtn}>
                  글 삭제하기
                </Button>
                {role === 'writer' && (
                  <Button typeName={'submitEditType'} onClick={handleEditBtn}>
                    글 수정하기
                  </Button>
                )}
              </>
            ) : (
              <></>
            )}
          </ButtonWrapper>
        </PostDetailContainer>
        <PostWrapper>
          <TopicWrapper>
            <CheckboxIc />
            <TopicText>{postData?.topic}</TopicText>
          </TopicWrapper>
          <PostContainer dangerouslySetInnerHTML={{ __html: postData?.content || '' }} />
        </PostWrapper>
        <WriterInfoWrapper>
          <WriterInfoContainer>
            <DefaultProfileIc />
            <InfoWrapper>
              <WriterInfoBox>
                <WriterInfoText>{postData?.writerName}</WriterInfoText>
                <GroupInfoText>{postData?.moimName}</GroupInfoText>
              </WriterInfoBox>
              <WriterDesc>
                {!postData?.writerInfo ? '아직 작가소개를 작성하지 않았어요' : postData?.writerInfo}
              </WriterDesc>
            </InfoWrapper>
          </WriterInfoContainer>
          {isMember && <CuriousBtn />}
        </WriterInfoWrapper>
        {isMember && <Comment postId={postId} />}
        <Spacing marginBottom="8" />
      </PostDetailWrapper>

      {/* 우선은 조건부로 연결해두었는데 reducer나 state를 통해서 업데이트 하도록 변경해도 될 듯 */}
      <DefaultModal
        isModalOpen={isModalOpen}
        onClickBg={handleCloseModal}
        content={modalType === 'DELETE' ? MODAL.POST_DELETE : MODAL.POST_EDIT}
        modalImg={modalType === 'DELETE' ? 'DELETE' : 'EDIT'}
      >
        <DefaultModalBtn
          btnText={['예', '아니요']}
          onClickLeft={modalType === 'DELETE' ? handleDeletePost : handleEdit}
          onClickRight={handleCloseModal}
        />
      </DefaultModal>
    </>
  );
};

export default PostDetail;

const DividingLine = styled.div`
  width: 0.1rem;
  height: 1.4rem;

  background-color: ${({ theme }) => theme.colors.gray30};
  border-radius: 2px;
`;

const ThumnailImg = styled.img`
  width: 100%;
  height: 37rem;
  object-fit: cover;

  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const PostDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
  align-items: center;
  justify-content: center;
  width: 82.6rem;
`;

const PostDetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const InfoTextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  width: 100%;
`;

const DetailBox = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
`;

const TitleText = styled.h1`
  color: ${({ theme }) => theme.colors.grayBlack};
  ${({ theme }) => theme.fonts.title1};
`;

const DateText = styled.p`
  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.subtitle4};
`;

const CuriousCount = styled.div`
  display: flex;
  gap: 0.2rem;
  align-items: center;

  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.subtitle4};
`;

const ViewCount = styled.div`
  display: flex;
  gap: 0.2rem;
  align-items: center;

  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.subtitle4};
`;

const CommentCount = styled.div`
  display: flex;
  gap: 0.2rem;
  align-items: center;

  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.subtitle4};
`;

const ButtonWrapper = styled.div<{ role: string }>`
  display: flex;
  gap: 1.2rem;
  align-items: flex-start;
  justify-content: center;
  width: ${({ role }) => (role === 'writer' ? `28rem` : role === 'owner' ? '12rem' : '0rem')};
`;

const TopicWrapper = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  padding: 2.6rem 3.2rem;

  background-color: ${({ theme }) => theme.colors.mileViolet};
  border-radius: 8px;
`;

const TopicText = styled.p`
  color: ${({ theme }) => theme.colors.gray90};

  ${({ theme }) => theme.fonts.subtitle3};
`;

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
`;
const PostContainer = styled.div`
  width: 100%;
  height: fit-content;
  min-height: 6rem;
  padding: 3.6rem;

  word-break: keep-all;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;

  ${({ theme }) => theme.fonts.body2};

  & > ul {
    padding-left: 17px;

    list-style-type: disc;
  }

  & > ol {
    padding-left: 17px;

    list-style: decimal;
  }

  & > blockquote {
    padding-left: 1.8rem;

    border-left: 4px solid #6139d1;
  }

  & > p {
    min-height: 2.5rem;
  }
`;

const WriterInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 15.3rem;
  padding: 2.8rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
`;

const WriterInfoContainer = styled.div`
  display: flex;
  gap: 1.6rem;
  justify-content: flex-start;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  width: 53.6rem;
  max-height: 9.7rem;
`;

const WriterInfoBox = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  max-width: 53.6rem;
  height: 2.4rem;
`;

const WriterDesc = styled.div`
  overflow: hidden;

  color: ${({ theme }) => theme.colors.gray80};
  text-overflow: ellipsis;
  word-break: keep-all;

  ${({ theme }) => theme.fonts.body3};
`;
const WriterInfoText = styled.p`
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.subtitle2};
`;

const GroupInfoText = styled.p`
  color: ${({ theme }) => theme.colors.gray50};
  ${({ theme }) => theme.fonts.body6};
`;
