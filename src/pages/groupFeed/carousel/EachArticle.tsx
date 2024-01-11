import styled from '@emotion/styled';

import { GroupListProfileOpenIc } from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';

const EachArticle = () => {
  return (
    <ArticleWrapper>
      <ArticleTitle>글제목 부분입니다. 공백포함 최대 29자입니다.</ArticleTitle>
      <Spacing marginBottom="1.6" />
      <ArticleContent>
        글내용입니다. 글내용입니다. 글내용입니다. 글내용입니다.
        글내용입니다.글내용입니다.글내용입니다.글내용입니다.글내용입니다. 글내용입니다.
        글내용입니다. 글내용입니다.글내용입니다. 글내용입니다.글내용입니다.
        글내용입니다.글내용입니다. 글내용입니다.글내용입니다. 글내용입니다.최대 3줄입니다.
      </ArticleContent>
      <Spacing marginBottom="1.2" />
      <ArticleInfo>
        <GroupListProfileOpenIc />
        <ProfileName>프로필명</ProfileName>
        <ArticleDetail>23.12.29 11:11</ArticleDetail>
        <ArticleDetail>·</ArticleDetail>
        <ArticleDetail>궁금해요</ArticleDetail>
        <ArticleDetailBold>14</ArticleDetailBold>
      </ArticleInfo>
    </ArticleWrapper>
  );
};

export default EachArticle;

const ArticleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 72rem;
  padding: 3.2rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
`;

const ArticleTitle = styled.div`
  color: ${({ theme }) => theme.colors.black};

  ${({ theme }) => theme.fonts.title5};
`;

const ArticleContent = styled.div`
  color: ${({ theme }) => theme.colors.gray70};

  ${({ theme }) => theme.fonts.body3};
`;

const ArticleInfo = styled.div`
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.colors.gray90};

  ${({ theme }) => theme.fonts.subtitle3};
`;

const ArticleDetail = styled.div`
  margin-right: 0.4rem;

  color: ${({ theme }) => theme.colors.gray60};

  ${({ theme }) => theme.fonts.body6};
`;

const ArticleDetailBold = styled.div`
  color: ${({ theme }) => theme.colors.gray70};

  ${({ theme }) => theme.fonts.body5};
`;

const ProfileName = styled.div`
  margin-right: 1.2rem;
  margin-left: 0.8rem;

  color: ${({ theme }) => theme.colors.gray80};

  ${({ theme }) => theme.fonts.subtitle6};
`;
