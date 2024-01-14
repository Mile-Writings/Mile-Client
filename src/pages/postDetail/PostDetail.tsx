import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';

import Comment from './components/Comment';
import CuriousBtn from './components/CuriousBtn';
import { useGetPostDetail } from './hooks/queries';

import MakeGroupBtn from '../groupFeed/components/MakeGroupBtn';
import MyGroupBtn from '../groupFeed/components/MyGroupBtn';

import { CheckboxIc, DefaultProfileIc, HeaderLogoIc } from './../../assets/svgs';
import Button from './../../components/commons/Button';
import LogInOutBtn from './../../components/commons/LogInOutBtn';
import Spacing from './../../components/commons/Spacing';

const PostDetail = () => {
  const navigate = useNavigate();
  const { postId } = useParams();

  const { data, isError, isLoading } = useGetPostDetail(postId || '');
  // const { data1, isError1, isLoading1 } = useGetCuriousInfo(postId || '');
  // console.log(data1);
  const postData = data?.data;
  if (isError) {
    navigate('/error');
  }
  if (isLoading) {
    <div>Loading~</div>;
  }
  // 리팩토링 전 코드
  // useEffect(() => {
  //   if (typeof postId === 'string') {
  //     const data = fetchPostDetail(postId);
  //     console.log(data);
  //   }
  // }, []);

  return (
    <>
      <PostHeader>
        <HeaderLogoIcon
          onClick={() => {
            navigate('/');
          }}
        />
        <HeaderBtnLayout>
          <MyGroupBtn />
          <CommonBtnLayout>
            <MakeGroupBtn />
            <LogInOutBtn>로그아웃</LogInOutBtn>
          </CommonBtnLayout>
        </HeaderBtnLayout>
      </PostHeader>
      <ThumnailImg src={postData?.imageUrl} alt={'썸네일 이미지'} />
      <Spacing marginBottom="4.8" />
      <PostDetailWrapper>
        <PostDetailContainer>
          <InfoTextBox>
            <TitleText>{postData?.title}</TitleText>
            <DateText>{postData?.createdAt}</DateText>
          </InfoTextBox>
          <ButtonWrapper>
            <Button typeName={'deleteTempType'}>글 삭제하기</Button>
            <Button typeName={'submitEditType'}>글 수정하기</Button>
          </ButtonWrapper>
        </PostDetailContainer>
        <PostWrapper>
          <TopicWrapper>
            <CheckboxIc />
            <TopicText>{postData?.topic}</TopicText>
          </TopicWrapper>
          <PostContainer>{postData?.content}</PostContainer>
        </PostWrapper>
        <WriterInfoWrapper>
          <WriterInfoContainer>
            <DefaultProfileIc />
            <InfoWrapper>
              <WriterInfoBox>
                <WriterInfoText>{postData?.writerName}</WriterInfoText>
                <GroupInfoText>{postData?.moimName}</GroupInfoText>
              </WriterInfoBox>
              <WriterDesc>{postData?.writerInfo && '아직 작가소개를 작성하지 않았어요'}</WriterDesc>
            </InfoWrapper>
          </WriterInfoContainer>
          <CuriousBtn curiousNum={4}></CuriousBtn>
        </WriterInfoWrapper>

        <Comment />
        <Spacing marginBottom="8" />
      </PostDetailWrapper>
    </>
  );
};

export default PostDetail;

const PostHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 6.4rem;
  padding: 0 6rem;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray30};
`;
const HeaderBtnLayout = styled.div`
  display: flex;
  align-items: center;
  height: 6.4rem;
`;
const CommonBtnLayout = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  height: 6.4rem;
`;

const HeaderLogoIcon = styled(HeaderLogoIc)`
  cursor: pointer;
`;

const ThumnailImg = styled.img`
  width: 100%;
  height: 37rem;
  object-fit: cover;
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
`;

const TitleText = styled.h1`
  color: ${({ theme }) => theme.colors.grayBlack};
  ${({ theme }) => theme.fonts.title1};
`;

const DateText = styled.p`
  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.subtitle4};
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: flex-start;
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
`;
const PostContainer = styled.div`
  width: 100%;
  height: fit-content;
  min-height: 6rem;
  padding: 3.6rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  ${({ theme }) => theme.fonts.body2};
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
