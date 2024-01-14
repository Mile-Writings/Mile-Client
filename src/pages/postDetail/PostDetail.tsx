import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';

import Comment from './components/Comment';
import CuriousBtn from './components/CuriousBtn';
import { useGetPostDetail } from './hooks/queries';

import MakeGroupBtn from '../groupFeed/components/MakeGroupBtn';
import MyGroupBtn from '../groupFeed/components/MyGroupBtn';

import Image from './../../assets/images/defaultSeaImage.png';
import { CheckboxIc, DefaultProfileIc, HeaderLogoIc } from './../../assets/svgs';
import Button from './../../components/commons/Button';
import LogInOutBtn from './../../components/commons/LogInOutBtn';
import Spacing from './../../components/commons/Spacing';

const PostDetail = () => {
  const navigate = useNavigate();
  const { postId } = useParams();

  const { data, isError, isLoading } = useGetPostDetail(postId || '');

  if (isError) {
    navigate('/error');
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
      <ThumnailImg src={Image} />
      <Spacing marginBottom="4.8" />
      <PostDetailWrapper>
        <PostDetailContainer>
          <InfoTextBox>
            <TitleText>{data?.topic}</TitleText>
            <DateText>2023년 6월 8일</DateText>
          </InfoTextBox>
          <ButtonWrapper>
            <Button typeName={'deleteTempType'}>글 삭제하기</Button>
            <Button typeName={'submitEditType'}>글 수정하기</Button>
          </ButtonWrapper>
        </PostDetailContainer>
        <PostWrapper>
          <TopicWrapper>
            <CheckboxIc />
            <TopicText>수학과 관련된 단편 소설 제작하기</TopicText>
          </TopicWrapper>
          <PostContainer>
            Cade가 소말리아에 저질렀다 여겨지는 여러 만행이 있지만, 추측들 중 가장 신빙성 있는 것은
            &apos;실험설&apos;이었다. Cade사와 정부가 손잡고 생체실험을 진행했으며 이를 폐공장
            지대에서 진행했다는 것이다. 그리고 남자는 그 여러 &quot; 텁텁한 공기가 코 끝을
            간지럽힌다. 숨을 쉴 때마다 복면으로도 걸러지지 않는 미세한 먼지가 코를 자극해 자꾸만
            재채기가 나오려 한다. 팔은 등 뒤로 돌려져 단단히 묶여 있어, 어깨가 꺾일 것 같았다. 손을
            쥐락펴락하며 감각이 돌아온 것을 확인하자마자 주변을 파악하려 했지만 얼굴 전체가 가려져
            있었기에 확인하기 어려웠다. 특수한 훈련을 받은 것도 아니므로 주변 상황을 청각으로
            알아채기란 요원했다. 유진은 어디로 갔는지, 자신을 납치한 이놈들에게 끌려간 것이 아닌지
            걱정이 되었다. 어디에 떨어져도 잘 살아남을 것 같은 그녀지만, 이토록 무자비한
            테러리스트(확실하지는 않지만 아마 맞을 것이다. 대낮에 사람을 납치할 정도로 막 나가는
            녀석들은 테러리스트나 저항군, 반란군 정도밖에 없을 것이니까.)에게 그녀의 밝음이 전해지길
            바라는 것은 무리다. &quot; 깼나.&quot; 굵은 목소리의 남자가 말을 걸어왔다. 비영어권 주민
            특유의 툭툭 끊기는 억양이 거슬렸다. 누구인지 알 수는 없었지만 소말리아 사람인게
            분명했다. &quot;저를 왜 납치한 거죠? 저는 아무것도 모릅니다. 아니, 모르는 정도가 아니라
            그저 심부름을 하러 온 사람입니다. 납치해도 아무 의미 없는 그런 사람이에요! 올웨니나
            Cade에 대해 아무것도 모릅니다. 제가 아는 정보가 그쪽에게 이득이 될 것 같지도 않고요!
            제발 풀어주세요! 찾아야 할 사람이 있습니다!&quot; 기철은 발버둥 치며 정신없이 말을
            쏟아냈다. 남자는 아무런 대답도 하지 않고 기철의 말이 끝나기를 기다렸다. &quot; 이곳에서
            있었던 일은 아무에게도 말하지 않겠습니다. 모가디슈 앞에 버려주기만 한다면 평생 다물고
            살게요! 저는 당신이 누군지, 여기가 어딘지 모릅니다. 그러니 제발 부탁합니다.
            풀어주세요!&quot; &quot;당신, Cade 사람이지?&quot; 남자는 기철의 말이 끝나자마자 나직한
            목소리로 물었다. 젠장, 역시 Cade에 불만을 가진 녀석들인가. 돌아가자마자 때려치우던가
            해야지. 돌아갈 수만 있다면 말이야. &quot;예...&quot; &quot;Cade가 다시 왔다는 건 자재가
            필요한 모양인데, 무슨 자재인지 알고 있나?&quot; 짐작 가는 바가 있었지만 기철은 그의
            심기를 건드리지 않기로 했다. 무해하고 무고한 희생자를 연기하면서. &quot;들은 바가
            없습니다. 말씀드렸다시피 저는 그저 심부름꾼입니다.&quot; 그러나 기철의 혼신을 다한
            연기에도 남자는 기철의 장단에 맞춰줄 생각이 없어 보였다. &quot;Cade 놈들을 내쫓으려고
            우리가 어떤 노력을 하고, 어떤 희생을 치렀는데... 뻔뻔하게 다시 기어들어오려 하는
            건가?&quot; &quot;아니... 그건 아닐 겁니다.&quot; &quot; 어이, 너. Cade가 우리나라에 한
            짓을 알고 있나?&quot; 남자는 갑자기 자신의 이야기를 시작했다. 기철은 듣고 싶지 않았지만
            그의 비위를 맞춰주기 위해 필사적으로 고개를 끄덕이며 호응했다. &quot;우리나라는 Cade의
            거대한 실험실이었다. 다른 나라의 사정은 모르지만 아마 그놈들이라면 세계 전체를 실험
            대상으로 보고 있겠지.&quot; (비공식적으로)
          </PostContainer>
        </PostWrapper>
        <WriterInfoWrapper>
          <WriterInfoContainer>
            <DefaultProfileIc />
            <InfoWrapper>
              <WriterInfoBox>
                <WriterInfoText>작자미상</WriterInfoText>
                <GroupInfoText>모임명</GroupInfoText>
              </WriterInfoBox>
              <WriterDesc>
                익명으로 작성한 사용자입니다. 익명으로 작성한 사용자입니다. 익명으로 작성한
                사용자입니다. 익명으로 작성한 사용자입니다. 익명으로 작성한 사용자입니다. 익명으로
                작성한 사용자입니다.익명으로 작성한 사용자입니다.익명으로 작성한
                사용자입니다.익명으로 작성한 사용자입니다.익명으로 작성한 사용자입니다.익명으로
                작성한 사용자입니다.익명으로 작성한 사용자입니다.
              </WriterDesc>
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
