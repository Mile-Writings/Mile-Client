import styled from '@emotion/styled';
import { AxiosError } from 'axios';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import {
  CreateGroupImageUpload,
  CreateGroupImageUploadedIc,
  CreateGroupInfoIc,
  CreateGroupRadioCheckedIc,
  CreateGroupRadioUncheckedIc,
} from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';
import useImageUpload from '../../../hooks/useImageUpload';

import { FileType } from '../../../types/imageUploadType';

import { MOBILE_MEDIA_QUERY } from '../../../styles/mediaQuery';
import { INPUT_INFO_MESSAGE } from '../constants/inputInfoMsg';

import {
  MAX_TOPIC_DESC_LENGTH,
  MAX_TOPIC_KEYWORD_LENGTH,
  MAX_TOPIC_LENGTH,
} from '../constants/topicLength';
import { useGetGroupNameValidation } from '../hooks/queries';
import { CurrentPageType } from '../types/stateType';
import CreateGroupTopicModal from './CreateGroupTopicModal';
import createGroupIlust from '/src/assets/images/createGroupIlust.png';
import createGroupWebp from '/src/assets/webps/creategroup.webp';

type Setter<T> = (value: T) => void;
interface CreateGroupInfoPropTypes {
  setCurrentPage: Dispatch<SetStateAction<CurrentPageType['currentPage']>>;
  groupName: string;
  setGroupName: Setter<ChangeEvent<HTMLInputElement>>;
  groupInfo: string;
  setGroupInfo: Setter<ChangeEvent<HTMLTextAreaElement>>;
  isPublic: boolean;
  setIsPublic: Setter<boolean>;
  topic: string;
  topicTag: string;
  topicDesc: string;
  setTopic: Setter<string>;
  setTopicTag: Setter<string>;
  setTopicDesc: Setter<string>;
  groupImageView: string;
  setGroupImageView: Dispatch<SetStateAction<string>>;
  setImageFile: Dispatch<SetStateAction<FileType>>;
}

const CreateGroupInfo = ({
  setCurrentPage,
  groupName,
  setGroupName,
  groupInfo,
  setGroupInfo,
  isPublic,
  setIsPublic,
  topic,
  topicTag,
  topicDesc,
  setTopic,
  setTopicTag,
  setTopicDesc,
  groupImageView,
  setGroupImageView,
  setImageFile,
}: CreateGroupInfoPropTypes) => {
  const [isGroupNameEmpty, setIsGroupNameEmpty] = useState(false);
  const [isGroupNameValid, setIsGroupNameValid] = useState(true);
  const [isGroupTopicEmpty, setIsGroupTopicEmpty] = useState(false);
  const [topicModal, setTopicModal] = useState(false);
  const [passDuplicate, setPassDuplicate] = useState(false);
  const [groupNameInputMsg, setGroupNameInputMsg] = useState<string>(INPUT_INFO_MESSAGE.EMPTY_TEXT);
  const [isHovered, setIsHovered] = useState(false);

  const groupNameRef = useRef<HTMLInputElement>(null);
  const groupInfoRef = useRef<HTMLTextAreaElement>(null);
  const isGroupInfoValid = groupInfo.length <= 100;
  const topicValidationAll =
    topicTag &&
    topic &&
    topic.length <= MAX_TOPIC_LENGTH &&
    topicTag.length <= MAX_TOPIC_KEYWORD_LENGTH &&
    topicDesc.length <= MAX_TOPIC_DESC_LENGTH;

  const { onImageUpload } = useImageUpload({ setPreviewImgUrl: setGroupImageView, setImageFile });
  const { groupNameValidationData, refetch, isSuccess, error } =
    useGetGroupNameValidation(groupName);

  // 이미지 보낼 url 받아오기groupNameValidationData

  const handleDuplicateGroupName = () => {
    refetch();
  };

  const handleIsPublic = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPublic(e.target.value === 'true');
  };

  //다음페이지로 넘어가는 함수
  const handleCurrentPage = () => {
    if (groupInfo.length > 100) {
      if (groupInfoRef.current) {
        groupInfoRef.current.focus();
        groupInfoRef.current.scrollIntoView({ behavior: 'instant', block: 'center' });
      }
      return;
    }

    //그룹이름 여부, 그룹이름 유효성(길이), 토픽, 토픽태그, 중복검사 통과여부 확인
    if (groupName && isGroupNameValid && topic && topicTag && passDuplicate && topicValidationAll) {
      setCurrentPage('GroupLeaderInfoPage');
    }
    //그룹이름 없거나 그룹이름 유효하지 않은 경우
    else if (!groupName || !isGroupNameValid) {
      if (!groupName) {
        setIsGroupNameEmpty(true);
      }

      if (groupNameRef.current) {
        groupNameRef.current && groupNameRef.current.focus();
      }
    }
    //중복검사를 하지 않았거나 통과하지 못했을 때
    else if ((isSuccess && groupNameValidationData === undefined) || !passDuplicate) {
      setGroupNameInputMsg(INPUT_INFO_MESSAGE.GROUP_NAME_NOT_CHECK);
      setIsGroupNameEmpty(true);
      if (groupNameRef.current) {
        groupNameRef.current && groupNameRef.current.focus();
      }
    }
    //topic이나 topicTag가 없을 때
    else if (!topic || !topicTag || !topicValidationAll) {
      setIsGroupTopicEmpty(true);
    } else {
      console.error('글모임 생성 페이지 이동시 문제가 발생하였습니다.');
    }
  };

  const handleGroupName = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 10) {
      setIsGroupNameValid(false);
    } else {
      setIsGroupNameValid(true);
      setGroupNameInputMsg(INPUT_INFO_MESSAGE.EMPTY_TEXT);
    }
    setGroupName(e);

    //input이 변경되면 중복검사, 유효성 검사 모두 다시하는 로직
    setPassDuplicate(false);
    setIsGroupNameEmpty(false);
  };

  const toggleModal = () => {
    setTopicModal((prev) => !prev);
  };

  useEffect(() => {
    if (error instanceof AxiosError && error?.response?.data.status === 400) {
      alert(INPUT_INFO_MESSAGE.GROUP_NAME_LENGTH);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      // API 호출 성공 시 응답 데이터에 따라 메시지 설정
      if (groupNameValidationData) {
        setGroupNameInputMsg(INPUT_INFO_MESSAGE.GROUP_NAME_AVAILABLE);
        setIsGroupNameValid(true);
        setIsGroupNameEmpty(false);
        setPassDuplicate(true);
      } else {
        setGroupNameInputMsg(INPUT_INFO_MESSAGE.GROUP_NAME_NOT_AVAILABLE);
        setIsGroupNameValid(false);
        setIsGroupNameEmpty(false);
      }
    }

    if (groupName.length > 10) {
      setGroupNameInputMsg(INPUT_INFO_MESSAGE.GROUP_NAME_LENGTH);
    }
  }, [isSuccess, groupNameValidationData, error, groupName]);

  return (
    <>
      <CreateGroupLayout>
        <TitleWrapper>
          <SubTitle>안녕하세요. 마일에 오신 것을 환영합니다</SubTitle>
          <Spacing marginBottom="1.1" />
          <Title>나만의 글 모임을 만들어보세요</Title>
          <Spacing marginBottom="2.4" />
          <picture>
            <source srcSet={createGroupWebp} />
            <GroupImage src={createGroupIlust} alt="group main image" />
          </picture>
        </TitleWrapper>
        <WhiteInputWrapper isValid={!isGroupNameEmpty}>
          <GroupInputWrapper>
            <InputTitleText>글 모임 이름*</InputTitleText>
            <GroupNameInputLayout>
              <GroupNameInput
                ref={groupNameRef}
                onChange={handleGroupName}
                placeholder="띄어쓰기 포함 10자 이내로 입력해주세요."
                isValid={isGroupNameValid}
                value={groupName}
                maxLength={11}
              />
              <DuplicateCheckBtn
                type="button"
                positive={groupName !== '' && groupName.length <= 10}
                onClick={handleDuplicateGroupName}
                disabled={!groupName || groupName.length > 10}
              >
                중복확인
              </DuplicateCheckBtn>
            </GroupNameInputLayout>

            {isGroupNameValid && groupNameInputMsg === INPUT_INFO_MESSAGE.GROUP_NAME_AVAILABLE ? (
              <SuccessMsgText>{groupNameInputMsg}</SuccessMsgText>
            ) : (
              <ErrorMsgText>{groupNameInputMsg}</ErrorMsgText>
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
              ref={groupInfoRef}
              value={groupInfo}
            />
            <TextAreaLength isValid={isGroupInfoValid}> {groupInfo.length} / 100</TextAreaLength>
          </GroupInputWrapper>
        </GroupInfoWrppaer>
        <WhiteInputWrapper isValid={true}>
          <GroupInputWrapper>
            <InputTitleText>글 모임 사진</InputTitleText>
            <GroupImageLabel htmlFor="file">
              <GroupImageWrapper>
                {' '}
                {groupImageView ? (
                  <GroupImagePreviewWrapper>
                    <GroupImagePreview src={groupImageView} />
                    <CreateGroupImageUploadedIcon className="group-image-preview" />
                  </GroupImagePreviewWrapper>
                ) : (
                  <CreateGroupImageUploadIcon className="group-image-preview" />
                )}
              </GroupImageWrapper>

              <GroupImageInput
                type="file"
                name="file"
                id="file"
                accept="image/*"
                onChange={onImageUpload}
              />
            </GroupImageLabel>

            <GroupInputDesc>
              *글모임 페이지 상단에 노출될 대표 이미지입니다. 1366*306px사이즈를 권장합니다.
            </GroupInputDesc>
          </GroupInputWrapper>
        </WhiteInputWrapper>
        <WhiteInputWrapper isValid={true}>
          <GroupInputHorizonWrapper>
            <GroupPublicDescWrapper>
              <GroupPublicDesc>해당 글모임을 공개/비공개로 설정하시겠습니까?</GroupPublicDesc>
              <CreateGroupInfoIc
                onMouseLeave={() => setIsHovered(false)}
                onMouseEnter={() => setIsHovered(true)}
              />
              <PublicInfoWrapper isVisible={isHovered}>
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

            <GroupPublicDescResponsiveBox>
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
            </GroupPublicDescResponsiveBox>
          </GroupInputHorizonWrapper>
        </WhiteInputWrapper>
        <WhiteInputWrapper isValid={!isGroupTopicEmpty}>
          <GroupInputHorizonWrapper>
            <TopicSettingWrapper>
              <TopicSettingText>글모임 생성 전에 첫번째 글감을 설정해보세요*</TopicSettingText>

              <TopicSettingAdditionalText>
                {!(topicTag && topic)
                  ? '관리자 페이지에서 언제든지 수정 가능합니다.'
                  : '첫번째 글감 작성이 완료되었습니다. 관리자 페이지에서 언제든지 수정 가능합니다.'}
              </TopicSettingAdditionalText>
            </TopicSettingWrapper>
            <TopicCreateBtn
              onClick={toggleModal}
              disabled={!!topicValidationAll}
              isBtnEnabled={!topicValidationAll}
            >
              글감 작성하기
            </TopicCreateBtn>
          </GroupInputHorizonWrapper>
        </WhiteInputWrapper>
        <NextBtn onClick={handleCurrentPage}>다음</NextBtn>
      </CreateGroupLayout>
      {topicModal && (
        <Overlay>
          <CreateGroupTopicModal
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

const GroupPublicDescResponsiveBox = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 1rem;
    justify-content: flex-start;
    width: 100%;
  }
`;
const GroupImage = styled.img`
  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
    max-width: 33.5rem;
  }
`;
const PublicInfoText = styled.p`
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.body3};

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.mSubtitle2};
  }
`;
const PublicInfoWrapper = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 5.7rem;
  z-index: 2;
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

  @media ${MOBILE_MEDIA_QUERY} {
    top: 3rem;
    right: 0;
    width: 30rem;
    height: 10rem;
    padding: 0.8rem;

    ${({ theme }) => theme.fonts.mSubtitle3};
  }
`;
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

const TextAreaLength = styled.p<{ isValid: boolean }>`
  position: absolute;
  right: 4.5rem;
  bottom: 4rem;

  width: fit-content;

  color: ${({ theme, isValid }) => (isValid ? theme.colors.gray70 : theme.colors.mileRed)};

  ${({ theme }) => theme.fonts.button3};
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

const TopicCreateBtn = styled.button<{ isBtnEnabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12.7rem;
  height: 5.1rem;

  color: ${({ theme, isBtnEnabled }) =>
    isBtnEnabled ? theme.colors.mainViolet : theme.colors.gray50};

  background-color: ${({ theme, isBtnEnabled }) =>
    isBtnEnabled ? theme.colors.white : theme.colors.gray20};
  cursor: ${({ isBtnEnabled }) => (isBtnEnabled ? 'pointer' : 'default')};
  border: ${({ theme, isBtnEnabled }) =>
    isBtnEnabled ? `1px solid ${theme.colors.mainViolet}` : `1px solid ${theme.colors.gray50}`};
  border-radius: 10px;

  :hover {
    color: ${({ theme, isBtnEnabled }) => (isBtnEnabled ? theme.colors.mainViolet : ``)};

    background-color: ${({ theme, isBtnEnabled }) => (isBtnEnabled ? theme.colors.mileViolet : ``)};
  }
  ${({ theme }) => theme.fonts.button2};

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;
const TopicSettingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
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
  justify-content: flex-end;
  width: 10rem;

  @media ${MOBILE_MEDIA_QUERY} {
    justify-content: flex-start;
  }
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
  justify-content: flex-end;
  width: 8rem;
  height: 1.9rem;

  @media ${MOBILE_MEDIA_QUERY} {
    justify-content: flex-start;
  }
`;
const GroupPublicDesc = styled.p`
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.title8};
`;
const GroupPublicDescWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const GroupInputDesc = styled.p`
  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.body4};

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.mSubtitle1};
  }
`;

const GroupImagePreviewWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const GroupImagePreview = styled.img`
  width: 100%;
  height: 20rem;
  object-fit: cover;

  cursor: pointer;
  border-radius: 8px;
`;

const CreateGroupImageUploadedIcon = styled(CreateGroupImageUploadedIc)`
  position: absolute;

  cursor: pointer;

  &:hover {
    g {
      path {
        fill: #6139d1;
      }
    }
  }
`;

const CreateGroupImageUploadIcon = styled(CreateGroupImageUpload)`
  position: absolute;
  z-index: 1;

  cursor: pointer;

  &:hover {
    g {
      path {
        fill: #6139d1;
      }
    }
  }
`;

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
  width: 100%;
  height: 20rem;

  background-color: ${({ theme }) => theme.colors.gray10};
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightViolet};

    .group-image-preview {
      g {
        path {
          fill: #6139d1;
        }
      }
    }
  }
`;

const CreateGroupLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
  width: 82.6rem;
  height: fit-content;
  margin-bottom: 8rem;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;

const TitleWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.mainViolet};
  ${({ theme }) => theme.fonts.title1};

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.mTitle6}
  }
`;

const SubTitle = styled.h2`
  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.title5};

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.mSubtitle4};
  }
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
  position: relative;
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

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.mTitle3};
  }
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

  @media ${MOBILE_MEDIA_QUERY} {
    ${({ theme }) => theme.fonts.mSubtitle2};
    ::placeholder {
      ${({ theme }) => theme.fonts.mSubtitle2};
    }
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

  @media ${MOBILE_MEDIA_QUERY} {
    height: 21rem;

    ${({ theme }) => theme.fonts.mSubtitle2};
    ::placeholder {
      ${({ theme }) => theme.fonts.mSubtitle2};
    }
  }
`;

const GroupInputHorizonWrapper = styled(GroupInputWrapper)`
  display: flex;
  flex-direction: row;
  gap: 1.6rem;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    gap: 3rem;
  }
`;
