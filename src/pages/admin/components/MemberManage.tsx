import styled from '@emotion/styled';

import { FetchMemberPropTypes, MEMBER, Members } from '../constants/MEMBER';

import Spacing from '../../../components/commons/Spacing';

const MemberManage = () => {
  return (
    <MemberTableWrapper>
      <TableHeaderLayout>
        <Header>프로필</Header>
        <Header>필명</Header>
        <Header>이메일</Header>
      </TableHeaderLayout>
      <Spacing marginBottom="0.4" />
      <MemberLayout>
        {MEMBER.map(({ data }: FetchMemberPropTypes) => {
          return data.members.map(({ profileImage, penName, email }: Members) => {
            return (
              <MemberItemContainer key={email}>
                <Profile src={profileImage} />
                <Name>{penName}</Name>
                <Email>{email}</Email>
                <ExpelBtn>삭제하기</ExpelBtn>
              </MemberItemContainer>
            );
          });
        })}
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

  &:first-child {
    margin-right: 7.75rem;
  }

  &:nth-child(2) {
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
`;
