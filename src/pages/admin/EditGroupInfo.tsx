import styled from '@emotion/styled';
import { useEffect, useState, ChangeEvent } from 'react';

import { useFetchGroupInfo } from './hooks/queries';

import {
  CreateGroupImageUpload,
  CreateGroupRadioCheckedIc,
  CreateGroupRadioUncheckedIc,
  CreateGroupInfoIc,
} from '../../assets/svgs';

const EditGroupInfo = () => {
  const [groupName, setGroupName] = useState('');
  const [groupDesc, setGroupDesc] = useState('');
  const [groupImageView, setGroupImageView] = useState(
    'https://mile-s3.s3.ap-northeast-2.amazonaws.com/test/groupMile.png',
  );
  const [isPublic, setIsPublic] = useState(true);
  const [groupImage, setGroupImage] = useState('');
  const [isHover, setIsHover] = useState(false);

  const { data } = useFetchGroupInfo('NDY=');
  useEffect(() => {
    setGroupName(data?.data.moimTitle);
    setGroupDesc(data?.data.description);
    setIsPublic(data?.data.isPublic);
    if (data?.data.imageUrl) setGroupImage(data?.data.imageUrl);
  }, [data]);

  const handleHover = () => {
    setIsHover((prev) => !prev);
  };

  const handleGroupName = () => {
    console.log('hd');
  };

  const handleIsPublic = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPublic(e.target.value === 'true');
  };
  return (
    <CreateGroupLayout>
      <WhiteInputWrapper isValid={true}>
        <GroupInputWrapper>
          <InputTitleText>글 모임 이름*</InputTitleText>
          <GroupNameInputLayout>
            <GroupNameInput
              // ref={groupNameRef}
              onChange={handleGroupName}
              placeholder="띄어쓰기 포함 10자 이내로 입력해주세요."
              isValid={true}
              value={groupName}
            />{' '}
            <DuplicateCheckBtn
              type="button"
              positive={groupName !== ''}
              // onClick={handleDuplicateGroupName}
              disabled={!groupName}
            >
              중복확인
            </DuplicateCheckBtn>
          </GroupNameInputLayout>

          {/* {isGroupNameValid && groupNameInputMsg === InputInfoMsg.groupNameAvailable ? (
            <SuccessMsgText>{groupNameInputMsg}</SuccessMsgText>
          ) : (
            <ErrorMsgText>{groupNameInputMsg}</ErrorMsgText>
          )} */}
        </GroupInputWrapper>
      </WhiteInputWrapper>{' '}
      <GroupInfoWrppaer>
        <GroupInputWrapper>
          <InputTitleText>글 모임 소개</InputTitleText>
          <GroupInfoTextarea
            placeholder="글 모임에 대해 자유롭게 소개해주세요."
            isValid={true}
            onChange={handleGroupName}
            maxLength={110}
            // ref={groupInfoRef}
            value={groupDesc}
          />
          <TextAreaLength isValid={true}> {0} / 100</TextAreaLength>
        </GroupInputWrapper>
      </GroupInfoWrppaer>
      <WhiteInputWrapper isValid={true}>
        <GroupInputWrapper>
          <InputTitleText>글 모임 사진</InputTitleText>
          <GroupImageLabel htmlFor="file">
            {groupImageView ? (
              <GroupImagePreview src={groupImageView} />
            ) : (
              <GroupImageWrapper>
                <CreateGroupImageUploadIcon />
              </GroupImageWrapper>
            )}
            <GroupImageInput
              type="file"
              name="file"
              id="file"
              accept="image/*"
              // onChange={(e) => {
              //   handleGroupImage(e);
              // }}
            />
          </GroupImageLabel>

          <GroupInputDesc>
            *글모임 페이지 상단에 노출될 대표 이미지입니다. 1366*306사이즈를 권장합니다.
          </GroupInputDesc>
        </GroupInputWrapper>
      </WhiteInputWrapper>
      <WhiteInputWrapper isValid={true}>
        <GroupInputHorizonWrapper>
          <GroupPublicDescWrapper>
            <GroupPublicDesc>해당 글모임을 공개/비공개로 설정하시겠습니까?</GroupPublicDesc>
            <CreateGroupInfoIc onMouseLeave={handleHover} onMouseEnter={handleHover} />
            <PublicInfoWrapper isVisible={isHover}>
              <PublicInfoText>
                {' '}
                글 모임원이 아니더라도 마일에 접속한 모든 사용자가 해당 글 모임에 방문할 수
                있습니다.
                <br />
                활발한 글 모임 활동이 이루어지면, 메인페이지 ‘마일과 함께하는 글모임’에 노출될
                가능성이 있습니다.
              </PublicInfoText>
            </PublicInfoWrapper>
          </GroupPublicDescWrapper>
          <GroupPublicDescContainer>
            <GroupIsPublicWrapper>
              <GroupisPublicLabel htmlFor="isPublicTrue">
                {isPublic ? <CreateGroupRadioCheckedIcon /> : <CreateGroupRadioUncheckedIcon />}
                공개
              </GroupisPublicLabel>
            </GroupIsPublicWrapper>
            <GroupIsPublicRadio
              type="radio"
              id="isPublicTrue"
              name="isPublic"
              value={'true'}
              onChange={handleIsPublic}
            />
          </GroupPublicDescContainer>
          <GroupPublicDescContainer>
            <GroupisPublicLabel htmlFor="isPublicFalse">
              {!isPublic ? <CreateGroupRadioCheckedIcon /> : <CreateGroupRadioUncheckedIcon />}
              비공개
            </GroupisPublicLabel>
            <GroupIsPublicRadio
              type="radio"
              id="isPublicFalse"
              name="isPublic"
              value={'false'}
              onChange={handleIsPublic}
            />
          </GroupPublicDescContainer>
        </GroupInputHorizonWrapper>
      </WhiteInputWrapper>
      <CreateGroupBtn>수정하기</CreateGroupBtn>
    </CreateGroupLayout>
  );
};

export default EditGroupInfo;
const CreateGroupBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5.1rem;

  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts.button2};
  background: ${({ theme }) => theme.colors.mainViolet};
  border: 1px solid ${({ theme }) => theme.colors.mainViolet};
  border-radius: 10px;

  :hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    background-color: ${({ theme }) => theme.colors.mileViolet};
    border: 1px solid ${({ theme }) => theme.colors.mileViolet};
  }
`;
const CreateGroupRadioUncheckedIcon = styled(CreateGroupRadioUncheckedIc)``;
const CreateGroupRadioCheckedIcon = styled(CreateGroupRadioCheckedIc)``;
const PublicInfoText = styled.p`
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.body3};
`;
const PublicInfoWrapper = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 5.7rem;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};

  /* display: flex; */
  flex-direction: column;
  justify-content: center;
  width: 66.3rem;
  height: 7.6rem;
  padding: 16px;

  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.mainViolet};
  border-radius: 8px;
`;
const GroupIsPublicRadio = styled.input`
  display: none;
`;

const GroupIsPublicWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  justify-content: center;
  width: 8rem;
`;
const GroupisPublicLabel = styled.label`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  overflow: visible;

  cursor: pointer;
  ${({ theme }) => theme.fonts.subtitle6};
`;

const GroupPublicDescContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  width: 8rem;
  height: 1.9rem;
`;
const GroupPublicDesc = styled.p`
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.body4};
`;
const GroupPublicDescWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 61.4rem;
`;

const CreateGroupImageUploadIcon = styled(CreateGroupImageUpload)``;
const GroupInputDesc = styled.p`
  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.body4};
`;
const GroupImagePreview = styled.img`
  width: 77rem;
  height: 20rem;
  object-fit: cover;

  cursor: pointer;
  border-radius: 8px;
`;

// const CreateGroupImageUploadIcon = styled(CreateGroupImageUpload)`
//   cursor: pointer;
// `;

const GroupImageLabel = styled.label`
  display: block;
`;
const GroupImageInput = styled.input`
  display: none;
`;

const GroupImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 77rem;
  height: 20rem;

  background-color: ${({ theme }) => theme.colors.gray10};
  cursor: pointer;
  border-radius: 8px;
`;

const TextAreaLength = styled.p<{ isValid: boolean }>`
  position: relative;
  bottom: 4rem;
  left: 70.6rem;

  ${({ theme }) => theme.fonts.button3};
  color: ${({ theme, isValid }) => (isValid ? theme.colors.gray70 : theme.colors.mileRed)};
`;
const GroupInfoWrppaer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: fit-content;

  border-radius: 8px;
`;

const WhiteInputWrapper = styled.section<{ isValid: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: fit-content;

  border: 1px solid ${({ theme, isValid }) => (isValid ? 'none' : theme.colors.mileRed)};
  border-radius: 8px;
`;

const GroupInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
  padding: 2.8rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
`;
const GroupInputHorizonWrapper = styled(GroupInputWrapper)`
  display: flex;
  flex-direction: row;
  gap: 1.6rem;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const InputTitleText = styled.p`
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.subtitle2};
`;

const GroupNameInputLayout = styled.div`
  display: flex;
  gap: 1.2rem;
  width: 100%;
  height: 4rem;
`;

const GroupNameInput = styled.input<{ isValid: boolean }>`
  width: 100%;
  height: 3.9rem;
  padding: 1rem 1.2rem;

  color: ${({ theme }) => theme.colors.gray100};

  background: ${({ theme }) => theme.colors.gray5};
  border: 1px solid
    ${({ theme, isValid }) => (isValid ? theme.colors.gray20 : theme.colors.mileRed)};

  /* border: 1px solid ${({ theme }) => theme.colors.gray20}; */
  border-radius: 6px;
  ${({ theme }) => theme.fonts.button2};

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray50};
  }
`;

const DuplicateCheckBtn = styled.button<{ positive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  /* padding: 1 1.6rem; */
  width: 8.1rem;
  height: 4rem;

  color: ${({ theme }) => theme.colors.gray70};
  color: ${({ theme, positive }) => (positive ? theme.colors.white : theme.colors.gray70)};

  background-color: ${({ theme, positive }) =>
    positive ? theme.colors.mainViolet : theme.colors.gray10};
  cursor: ${({ positive }) => (positive ? 'pointer' : 'default')};
  border-radius: 8px;
  ${({ theme }) => theme.fonts.button3};
`;

const GroupInfoTextarea = styled.textarea<{ isValid: boolean }>`
  width: 100%;
  height: 11rem;
  padding: 1rem 1.2rem;

  color: ${({ theme }) => theme.colors.gray100};

  background: ${({ theme }) => theme.colors.gray5};
  border: 1px solid
    ${({ theme, isValid }) => (isValid ? theme.colors.gray20 : theme.colors.mileRed)};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.button2};
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray50};
  }
`;

const CreateGroupLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
  width: 82.6rem;
  height: fit-content;
  margin-bottom: 8rem;
`;
