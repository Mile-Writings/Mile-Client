import styled from '@emotion/styled';
import { AxiosError } from 'axios';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import CreateGroupTopicModal from './CreateGroupTopicModal';

import {
  MAX_TOPIC_DESC_LENGTH,
  MAX_TOPIC_KEYWORD_LENGTH,
  MAX_TOPIC_LENGTH,
} from '../constants/topicLenth';
import { useGetGroupNameValidation } from '../hooks/queries';
import { CurrentPageType } from '../types/stateType';

import {
  CreateGroupIlust,
  CreateGroupImageUpload,
  CreateGroupInfoIc,
  CreateGroupRadioCheckedIc,
  CreateGroupRadioUncheckedIc,
} from '../../../assets/svgs';
import Spacing from '../../../components/commons/Spacing';
import { s3UrlParsing } from '../../../utils/s3UrlParsing';
import postDirectlyS3 from '../../postPage/apis/postDirectlyS3';
import { usePresignedUrl } from '../../postPage/hooks/queries';

interface CreateGroupInfoPropTypes {
  setCurrentPage: Dispatch<SetStateAction<CurrentPageType['currentPage']>>;
  groupName: string;
  setGroupName: (e: ChangeEvent<HTMLInputElement>) => void;
  groupInfo: string;
  setGroupInfo: (e: ChangeEvent<HTMLTextAreaElement>) => void;

  setGroupImageFile: (image: string) => void;
  isPublic: boolean;
  setIsPublic: (value: boolean) => void;
  topic: string;
  topicTag: string;
  topicDesc: string;
  setTopic: (e: ChangeEvent<HTMLInputElement>) => void;
  setTopicTag: (e: ChangeEvent<HTMLInputElement>) => void;
  setTopicDesc: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  groupImageView: string;
  setGroupImageView: Dispatch<SetStateAction<string>>;
}
export const InputInfoMsg = {
  groupNameLength: '10자 이내로 작성해주세요.',
  groupNameNotAvailable: '이미 사용중인 모임명입니다.',
  groupNameNotCheck: '중복확인을 해주세요.',
  groupNameAvailable: '사용 가능한 모임명입니다.',
  emptyText: '',
};
const CreateGroupInfo = ({
  setCurrentPage,
  groupName,
  setGroupName,
  groupInfo,
  setGroupInfo,
  setGroupImageFile,
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
}: CreateGroupInfoPropTypes) => {
  const [isGroupNameEmpty, setIsGroupNameEmpty] = useState(false);
  const [isGroupNameValid, setIsGroupNameValid] = useState(true);
  const [isGroupTopicEmpty, setIsGroupTopicEmpty] = useState(false);
  const [topicModal, setTopicModal] = useState(false);
  const [passDuplicate, setPassDuplicate] = useState(false);
  const [groupNameInputMsg, setGroupNameInputMsg] = useState<string>(InputInfoMsg.emptyText);
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
  const { data, refetch, isSuccess, error } = useGetGroupNameValidation(groupName);

  // 이미지 보낼 url 받아오기
  const { fileName, url = '' } = usePresignedUrl();

  const postDirectlyS3Func = async (url: string, imageFile: File) => {
    try {
      await postDirectlyS3(url, imageFile);
      const s3url = s3UrlParsing(url) || '';

      const urlToServer = `${s3url + fileName}`;

      setGroupImageFile(urlToServer);
    } catch (err) {
      if (err instanceof Error) throw err;
    }
  };

  const handleGroupImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (
      file &&
      (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')
    ) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          postDirectlyS3Func(url, file);
          setGroupImageView(reader.result);
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
    else if ((isSuccess && data === undefined) || !passDuplicate) {
      setGroupNameInputMsg(InputInfoMsg.groupNameNotCheck);
      setIsGroupNameEmpty(true);
      if (groupNameRef.current) {
        groupNameRef.current && groupNameRef.current.focus();
      }
    }
    //topic이나 topicTag가 없을 때
    else if (!topic || !topicTag || !topicValidationAll) {
      setIsGroupTopicEmpty(true);
    } else {
      console.log('예기치 않는 에러');
    }
  };

  const handleGroupName = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 10) {
      setIsGroupNameValid(false);
    } else {
      setIsGroupNameValid(true);
      setGroupNameInputMsg(InputInfoMsg.emptyText);
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
      alert(InputInfoMsg.groupNameLength);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      // API 호출 성공 시 응답 데이터에 따라 메시지 설정
      if (data?.data?.data?.isValidate) {
        setGroupNameInputMsg(InputInfoMsg.groupNameAvailable);
        setIsGroupNameValid(true);
        setIsGroupNameEmpty(false);
        setPassDuplicate(true);
      } else {
        setGroupNameInputMsg(InputInfoMsg.groupNameNotAvailable);
        setIsGroupNameValid(false);
        setIsGroupNameEmpty(false);
      }
    }

    if (groupName.length > 10) {
      setGroupNameInputMsg(InputInfoMsg.groupNameLength);
    }
  }, [isSuccess, data, error, groupName]);

  return (
    <>
      <CreateGroupLayout>
        <TitleWrapper>
          <SubTitle>안녕하세요. 마일에 오신 것을 환영합니다</SubTitle>
          <Spacing marginBottom="1.1" />
          <Title>나만의 글 모임을 만들어보세요</Title>
          <Spacing marginBottom="2.4" />
          <IllustImg />
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

            {isGroupNameValid && groupNameInputMsg === InputInfoMsg.groupNameAvailable ? (
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
                onChange={(e) => {
                  handleGroupImage(e);
                }}
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
        <Overlay onClick={toggleModal}>
          {' '}
          <CreateGroupTopicModal
            topic={topic}
            topicTag={topicTag}
            topicDesc={topicDesc}
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
  ${({ theme }) => theme.fonts.title8};
`;
const GroupPublicDescWrapper = styled.div`
  position: relative;
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
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.mainViolet};
  ${({ theme }) => theme.fonts.title1};
`;

const SubTitle = styled.h2`
  color: ${({ theme }) => theme.colors.gray70};
  ${({ theme }) => theme.fonts.title5};
`;

const IllustImg = styled(CreateGroupIlust)`
  display: flex;
  flex-shrink: 0;
  width: 100%;
  height: 36.6rem;
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
