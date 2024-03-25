import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';

import { Members } from '../constants/MEMBER';
import { useGetMemberInfo } from '../hooks/queries';

import { adminEmptyMemberIc as AdminEmptyMemberIcon } from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';

const MemberManage = () => {
  const { writerNameId } = useParams();
  const { data } = useGetMemberInfo(writerNameId || '');
  return (
    <MemberTableWrapper>
      <TableHeaderLayout>
        <Header>프로필</Header>
        <Header>필명</Header>
        <Header>이메일</Header>
      </TableHeaderLayout>
      <Spacing marginBottom="0.4" />
      <MemberLayout>
        {data?.writerNameCount !== 0 ? (
          data?.writerNameList.map(({ profileImage, writerNameId, writerName, email }: Members) => {
            return (
              <MemberItemContainer key={writerNameId}>
                <Profile src={profileImage} />
                <Name>{writerName}</Name>
                <Email>{email}</Email>
                <ExpelBtn>삭제하기</ExpelBtn>
              </MemberItemContainer>
            );
          })
        ) : (
          <EmptyContainer key={writerNameId}>
            <EmptyMemberText>아직 멤버가 없습니다.</EmptyMemberText>
            <Spacing marginBottom="3" />
            <AdminEmptyMemberIcon />
          </EmptyContainer>
        )}
      </MemberLayout>
    </MemberTableWrapper>
  );
};

export default MemberManage;

const MemberTableWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 78.1rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0.8rem;
`;

const TableHeaderLayout = styled.div`
  display: flex;
  padding: 1.4rem 1.8rem;

  color: ${({ theme }) => theme.colors.mainViolet};

  background-color: ${({ theme }) => theme.colors.mileViolet};
  border-radius: 0.8rem 0.8rem 0 0;
  ${({ theme }) => theme.fonts.button3};
`;

const Header = styled.p`
  display: flex;
  align-items: flex-start;

  &:first-of-type {
    margin-right: 7.75rem;
  }

  &:nth-of-type(2) {
    margin-right: 8.4rem;
  }
`;

const MemberLayout = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 1.8rem;
`;

const MemberItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1.6rem 0;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray10};
`;

const Profile = styled.img`
  margin-right: 4rem;
`;

const Name = styled.pre`
  width: 9.7rem;
  margin-right: 4.8rem;

  color: ${({ theme }) => theme.colors.black};
  text-align: center;

  ${({ theme }) => theme.fonts.body1};
`;

const Email = styled.pre`
  display: flex;
  align-items: flex-end;

  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.body1};
`;

const ExpelBtn = styled.button`
  margin-left: auto;

  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.button2};

  &:hover {
    color: ${({ theme }) => theme.colors.mainViolet};
  }
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 78.1rem;
  height: 36.8rem;
  padding: 0.4rem 1.8rem;
`;

const EmptyMemberText = styled.div`
  color: ${({ theme }) => theme.colors.gray50};
  ${({ theme }) => theme.fonts.title8};
`;
