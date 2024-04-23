import styled from '@emotion/styled';
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react';

import CreateGroupTopicModal from './CreateGroupTopicModal';

import { useGetGroupNameValidation } from '../hooks/queries';
import { CurrentPageType } from '../types/stateType';

import {
  CreateGroupImageUpload,
  CreateGroupInfoIc,
  CreateGroupRadioCheckedIc,
  CreateGroupRadioUncheckedIc,
} from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';

interface CreateGroupInfoPropTypes {
  setCurrentPage: Dispatch<SetStateAction<CurrentPageType['currentPage']>>;
  groupName: string;
  setGroupName: (e: ChangeEvent<HTMLInputElement>) => void;
  groupInfo: string;
  setGroupInfo: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  groupImageFile: string;
  setGroupImageFile: (image: string) => void;
  isPublic: boolean;
  setIsPublic: (value: boolean) => void;
  topic: string;
  topicTag: string;
  setTopic: (e: ChangeEvent<HTMLInputElement>) => void;
  setTopicTag: (e: ChangeEvent<HTMLInputElement>) => void;
  setTopicDesc: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const CreateGroupInfo = ({
  setCurrentPage,
  groupName,
  setGroupName,
  groupInfo,
  setGroupInfo,
  groupImageFile,
  setGroupImageFile,
  isPublic,
  setIsPublic,
  topic,
  topicTag,
  setTopic,
  setTopicTag,
  setTopicDesc,
}: CreateGroupInfoPropTypes) => {
  const isGroupNameValid = groupName.length <= 10;
  const isGroupInfoValid = groupInfo.length <= 100;
  const [isGroupNameEmpty, setIsGroupNameEmpty] = useState(false);
  const [isGroupImageEmpty, setIsGroupImageEmpty] = useState(false);
  const [isGroupTopicEmpty, setIsGroupTopicEmpty] = useState(false);
  const [topicModal, setTopicModal] = useState(false);
  const groupNameRef = useRef<HTMLInputElement>(null);
  const [groupNameValidationTrg, setGroupNameValidationTrg] = useState(false);

  const { data, error } = useGetGroupNameValidation(groupName, groupNameValidationTrg);
  console.log(data?.data?.data?.isValidate);
  console.log(error);
  const handleGroupImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (
      file &&
      (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')
    ) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setGroupImageFile(reader.result);
          setIsGroupImageEmpty(false);
        } else {
          console.log('Image Error');
        }
      };

      reader.onerror = (err) => {
        alert(err);
      };
    } else {
      alert('file 형식을 확인해주세요.');
    }
  };

  const handleDuplicateGroupName = () => {
    setGroupNameValidationTrg(true);
    // if (!data) {
    //   setGroupNameValidationTrg(false);
    // }
    alert('중복확인 로직');
  };
  const handleIsPublic = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value + '함수 작동');
    setIsPublic(e.target.value === 'true');
  };

  const InputInfoMsg = {
    groupNameLength: '10자 이내로 작성해주세요.',
    groupNameNotAvailable: '사용 불가능한 모임명 입니다.',
    groupNameNotCheck: '중복확인을 해주세요.',
    groupNameAvailable: '사용 가능한 모임명입니다.',
  };

  const handleCurrentPage = () => {
    if (
      groupName &&
      isGroupNameValid &&
      groupImageFile &&
      topic &&
      topicTag &&
      data?.data?.data?.isValidate
    )
      setCurrentPage('GroupLeaderInfoPage');
    else if (!groupName || !isGroupNameValid || !data?.data?.data?.isValidate) {
      if (!groupName) setIsGroupNameEmpty(true);
      else {
        setIsGroupNameEmpty(false);
      }

      if (groupNameRef.current) {
        groupNameRef.current && groupNameRef.current.focus();
      }
    } else if (!groupImageFile) {
      setIsGroupImageEmpty(true);
    } else if (!topic || !topicTag) {
      setIsGroupTopicEmpty(true);
    }
  };

  const handleGroupName = (e: ChangeEvent<HTMLInputElement>) => {
    setGroupName(e);
    setIsGroupNameEmpty(false);
    setGroupNameValidationTrg(false);
  };

  const toggleModal = () => {
    setTopicModal((prev) => !prev);
  };

  return (
    <>
      <CreateGroupLayout>
        <TitleWrapper>
          <SubTitle>안녕하세요. 마일에 오신 것을 환영합니다</SubTitle>
          <Spacing marginBottom="1.1" />
          <Title>나만의 글 모임을 만들어보세요</Title>
          <Spacing marginBottom="4.8" />
          <GreyBox />
        </TitleWrapper>
        <WhiteInputWrapper isValid={!isGroupNameEmpty}>
          <GroupInputWrapper>
            <InputTitleText>글 모임 이름*</InputTitleText>
            <GroupNameInputLayout>
              <GroupNameInput
                ref={groupNameRef}
                onChange={handleGroupName}
                placeholder="띄어쓰기 포함 10자 이내로 입력해주세요."
                isValid={isGroupNameValid && !error}
              />{' '}
              <DuplicateCheckBtn
                type="button"
                positive={groupName !== ''}
                onClick={handleDuplicateGroupName}
                disabled={!groupName}
              >
                중복확인
              </DuplicateCheckBtn>
            </GroupNameInputLayout>
            {data?.data?.data?.isValidate ? (
              <SuccessMsgText>{InputInfoMsg.groupNameAvailable}</SuccessMsgText>
            ) : (
              <ErrorMsgText>
                {!isGroupNameValid
                  ? InputInfoMsg.groupNameLength
                  : data?.data?.data?.isValidate === false
                    ? InputInfoMsg.groupNameNotAvailable
                    : ''}
              </ErrorMsgText>
            )}
          </GroupInputWrapper>
        </WhiteInputWrapper>
        <GroupInfoWrppaer>
          <GroupInputWrapper>
            <InputTitleText>글 모임 소개</InputTitleText>
            <GroupInfoTextarea
              placeholder="글 모임에 대해 자유롭게 소개해주세요."
              isValid={isGroupInfoValid}
              onChange={(e) => setGroupInfo(e)}
              maxLength={110}
            />
            <TextAreaLenth isValid={isGroupInfoValid}> {groupInfo.length} / 100</TextAreaLenth>
          </GroupInputWrapper>
        </GroupInfoWrppaer>
        <WhiteInputWrapper isValid={!isGroupImageEmpty}>
          <GroupInputWrapper>
            <InputTitleText>글 모임 사진</InputTitleText>
            <GroupImageLabel htmlFor="file">
              {groupImageFile ? (
                <GroupImagePreview src={groupImageFile} />
              ) : (
                <GroupImageWrapper>
                  <CreateGroupImageUploadIcon />
                </GroupImageWrapper>
              )}
            </GroupImageLabel>

            <GroupImageInput
              type="file"
              name="file"
              id="file"
              onChange={(e) => {
                handleGroupImage(e);
              }}
            />
            <GroupInputDesc>
              *글모임 페이지 상단에 노출될 대표 이미지입니다. 1366*306사이즈를 권장합니다.
            </GroupInputDesc>
          </GroupInputWrapper>
        </WhiteInputWrapper>
        <WhiteInputWrapper isValid={true}>
          <GroupInputHorizonWrapper>
            <GroupPublicDescWrapper>
              <GroupPublicDesc>해당 글모임을 공개/비공개로 설정하시겠습니까?</GroupPublicDesc>
              <CreateGroupInfoIc />
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
        <WhiteInputWrapper isValid={!isGroupTopicEmpty}>
          <GroupInputHorizonWrapper>
            <TopicSettingWrapper>
              <TopicSettingText>글모임 생성 전에 첫번째 글감을 설정해보세요*</TopicSettingText>
              <TopicSettingAdditionalText>
                관리자 페이지에서 언제든지 수정 가능합니다.
              </TopicSettingAdditionalText>
            </TopicSettingWrapper>
            <TopicCreateBtn onClick={toggleModal}>글감 작성하기</TopicCreateBtn>
          </GroupInputHorizonWrapper>
        </WhiteInputWrapper>
        <NextBtn onClick={handleCurrentPage}>다음</NextBtn>
      </CreateGroupLayout>
      {topicModal && (
        <Overlay onClick={toggleModal}>
          {' '}
          <CreateGroupTopicModal
            topic={topic}
            topicTag={topicTag}
            setTopic={setTopic}
            setTopicTag={setTopicTag}
            setTopicDesc={setTopicDesc}
            toggleModal={toggleModal}
            setIsGroupTopicEmpty={setIsGroupTopicEmpty}
          />
        </Overlay>
      )}
    </>
  );
};
export default CreateGroupInfo;

const SuccessMsgText = styled.p`
  ${({ theme }) => theme.fonts.body4};
  color: ${({ theme }) => theme.colors.mainGreen};
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  background-color: rgb(0 0 0 / 60%);
`;
const GroupInfoWrppaer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: fit-content;

  border-radius: 8px;
`;

const TextAreaLenth = styled.p<{ isValid: boolean }>`
  position: relative;
  bottom: 4rem;
  left: 70.6rem;

  ${({ theme }) => theme.fonts.button3};
  color: ${({ theme, isValid }) => (isValid ? theme.colors.gray70 : theme.colors.mileRed)};
`;
const ErrorMsgText = styled.p`
  ${({ theme }) => theme.fonts.body4};
  color: ${({ theme }) => theme.colors.mileRed};
`;
const CreateGroupRadioCheckedIcon = styled(CreateGroupRadioCheckedIc)`
  margin-right: 0.8rem;
`;

const CreateGroupRadioUncheckedIcon = styled(CreateGroupRadioUncheckedIc)`
  margin-right: 0.8rem;
`;

const NextBtn = styled.button`
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

const TopicCreateBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12.7rem;
  height: 5.1rem;

  color: ${({ theme }) => theme.colors.mainViolet};
  ${({ theme }) => theme.fonts.button2};

  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.mainViolet};
  border-radius: 10px;

  :hover {
    color: ${({ theme }) => theme.colors.mainViolet};

    background-color: ${({ theme }) => theme.colors.mileViolet};
  }
`;
const TopicSettingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const TopicSettingText = styled.p`
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.title8};
`;
const TopicSettingAdditionalText = styled.p`
  color: ${({ theme }) => theme.colors.mainViolet};
  ${({ theme }) => theme.fonts.body4};
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
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 61.4rem;
`;

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

const CreateGroupImageUploadIcon = styled(CreateGroupImageUpload)`
  cursor: pointer;
`;
const GroupImageLabel = styled.label``;
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

const CreateGroupLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
  width: 82.6rem;
  height: fit-content;
  margin-bottom: 8rem;
`;

const TitleWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 33.2rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.mainViolet};
  ${({ theme }) => theme.fonts.title1};
`;

const SubTitle = styled.h2`
  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.title5};
`;

const GreyBox = styled.div`
  width: 100%;
  height: 19.4rem;

  background-color: ${({ theme }) => theme.colors.gray20};
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

const GroupInputHorizonWrapper = styled(GroupInputWrapper)`
  display: flex;
  flex-direction: row;
  gap: 1.6rem;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
