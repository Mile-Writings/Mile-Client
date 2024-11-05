import styled from '@emotion/styled';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  CreateGroupImageUpload,
  CreateGroupImageUploadedIc,
  CreateGroupInfoIc,
  CreateGroupRadioCheckedIc,
  CreateGroupRadioUncheckedIc,
} from '../../../assets/svgs';
import { DEFAULT_IMG_URL } from '../../../constants/defaultImgUrl';
import useImageUpload from '../../../hooks/useImageUpload';
import handleImageUpload from '../../../utils/handleImageUpload';
import { InputInfoMsg } from '../../createGroup/components/CreateGroupInfo';
import { useGetGroupNameValidation } from '../../createGroup/hooks/queries';
import { usePresignedUrl } from '../../postPage/hooks/queries';
import { useFetchGroupInfo, usePutAdminGroupInfo } from '../hooks/queries';

const EditGroupInfo = () => {
  const [groupName, setGroupName] = useState('');
  const [beforeGroupName, setBeforeGroupName] = useState('');
  const [groupDesc, setGroupDesc] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isHover, setIsHover] = useState(false);

  const [groupNameInfoMsg, setGroupNameInfoMsg] = useState(InputInfoMsg.emptyText);

  const groupNameRef = useRef<HTMLInputElement>(null);

  const { groupId } = useParams();

  const { fileName = '', url = '' } = usePresignedUrl();

  const [previewImgUrl, setPreviewImgUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { onImageUpload } = useImageUpload({ setPreviewImgUrl, setImageFile });
  const [passDuplicate, setPassDuplicate] = useState(false);
  const [editBtnAcitve, setEditBtnActive] = useState(false);

  let isGroupNameChanged = beforeGroupName !== groupName;
  let groupNameLengthValid = groupName.length <= 10;
  const handleHover = () => {
    setIsHover((prev) => !prev);
  };

  const handleGroupName = (e: ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
    setPassDuplicate(false);
    setEditBtnActive(true);
    if (e.target.value.length > 10) {
      setGroupNameInfoMsg(InputInfoMsg.groupNameLength);
    } else {
      setGroupNameInfoMsg(InputInfoMsg.emptyText);
    }
  };
  const handleGroupDesc = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setGroupDesc(e.target.value);
    setEditBtnActive(true);
  };

  const handleGroupImage = (e: ChangeEvent<HTMLInputElement>) => {
    onImageUpload(e);
    setEditBtnActive(true);
  };

  const handleIsPublic = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPublic(e.target.value === 'true');
    setEditBtnActive(true);
  };

  const getGroupNameValidation = async () => {
    if (groupNameLengthValid && isGroupNameChanged) {
      await refetch();
    } else {
      throw new Error('잘못된 그룹명 변경 접근입니다.');
    }
  };

  const { groupInfo, isSuccess: groupInfoSuccess } = useFetchGroupInfo(groupId || '');

  const { mutate: putAdminGroupInfo } = usePutAdminGroupInfo({
    groupName,
    groupDesc,
    isPublic,
    groupId,
  });
  const { groupNameValidationData, refetch, isSuccess } = useGetGroupNameValidation(groupName);

  const editGroupInfo = async () => {
    if (groupName) {
      if ((passDuplicate || !isGroupNameChanged) && groupDesc.length <= 100) {
        const groupImageServerUrl = await handleImageUpload(
          url,
          fileName,
          imageFile,
          previewImgUrl,
        );
        if (groupImageServerUrl) {
          await putAdminGroupInfo(groupImageServerUrl);
          setEditBtnActive(false);
        }
      } else if (!passDuplicate && isGroupNameChanged) {
        if (groupNameRef.current) {
          groupNameRef.current && groupNameRef.current.focus();
          groupNameRef.current.scrollIntoView({ behavior: 'instant', block: 'center' });
          setGroupNameInfoMsg(InputInfoMsg.groupNameNotCheck);
        }
      }
    } else {
      if (groupNameRef.current) {
        groupNameRef.current && groupNameRef.current.focus();
        groupNameRef.current.scrollIntoView({ behavior: 'instant', block: 'center' });
        setGroupNameInfoMsg(InputInfoMsg.groupNameEmpty);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      if (groupNameValidationData === true) {
        setGroupNameInfoMsg(InputInfoMsg.groupNameAvailable);
        setPassDuplicate(true);
      } else if (groupNameValidationData === false) {
        setGroupNameInfoMsg(InputInfoMsg.groupNameNotAvailable);
        // setGroupNameValid(false);
      }
    }
  }, [groupNameValidationData, isSuccess]);

  useEffect(() => {
    if (groupInfoSuccess) {
      setGroupName(groupInfo?.moimTitle);
      setBeforeGroupName(groupInfo?.moimTitle);
      setGroupDesc(groupInfo?.description);
      setIsPublic(groupInfo?.isPublic);
      setPreviewImgUrl(groupInfo?.imageUrl);
    }
  }, [groupInfo, groupInfoSuccess]);

  return (
    <>
      <CreateGroupLayout>
        <WhiteInputWrapper isValid={true}>
          <GroupInputWrapper>
            <InputTitleText>글 모임 이름*</InputTitleText>
            <GroupNameInputLayout>
              <GroupNameInputWrapper>
                <GroupNameInput
                  ref={groupNameRef}
                  onChange={(e) => handleGroupName(e)}
                  placeholder="띄어쓰기 포함 10자 이내로 입력해주세요."
                  isValid={groupNameLengthValid}
                  value={groupName}
                />{' '}
                <TextAreaLength isValid={groupNameLengthValid}>
                  {groupName.length}/10
                </TextAreaLength>
              </GroupNameInputWrapper>
              <DuplicateCheckBtn
                type="button"
                positive={!!groupName && groupNameLengthValid && isGroupNameChanged}
                onClick={getGroupNameValidation}
                disabled={!groupName || !groupNameLengthValid || !isGroupNameChanged}
              >
                중복확인
              </DuplicateCheckBtn>
            </GroupNameInputLayout>

            <GroupNameValidationText
              validation={InputInfoMsg.groupNameAvailable === groupNameInfoMsg}
            >
              {groupNameInfoMsg}
            </GroupNameValidationText>
          </GroupInputWrapper>
        </WhiteInputWrapper>{' '}
        <GroupInfoWrppaer>
          <GroupInputWrapper>
            <InputTitleText>글 모임 소개</InputTitleText>
            <GroupInfoTextareaWrapper>
              <GroupInfoTextarea
                placeholder="글 모임에 대해 자유롭게 소개해주세요."
                isValid={groupDesc.length <= 100}
                onChange={(e) => handleGroupDesc(e)}
                maxLength={110}
                value={groupDesc}
              />
              <TextAreaLength isValid={groupDesc.length <= 100}>
                {groupDesc.length}/100
              </TextAreaLength>
            </GroupInfoTextareaWrapper>
          </GroupInputWrapper>
        </GroupInfoWrppaer>
        <WhiteInputWrapper isValid={true}>
          <GroupInputWrapper>
            <InputTitleText>글 모임 사진</InputTitleText>
            <GroupImageLabel htmlFor="file">
              <GroupImageWrapper>
                <GroupImagePreviewWrapper>
                  {previewImgUrl !== DEFAULT_IMG_URL ? (
                    <>
                      <GroupImagePreview src={previewImgUrl} />
                      <CreateGroupImageUploadedIcon className="group-image-preview" />
                    </>
                  ) : (
                    <CreateGroupImageUploadIcon className="group-image-preview" />
                  )}
                </GroupImagePreviewWrapper>
                <GroupImageInput
                  type="file"
                  name="file"
                  id="file"
                  accept="image/*"
                  onChange={(e) => {
                    handleGroupImage(e);
                  }}
                />
              </GroupImageWrapper>
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
                  {isPublic ? <CreateGroupRadioCheckedIc /> : <CreateGroupRadioUncheckedIc />}
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
                {!isPublic ? <CreateGroupRadioCheckedIc /> : <CreateGroupRadioUncheckedIc />}
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
        <EditGroupBtn onClick={editGroupInfo} active={editBtnAcitve} disabled={!editBtnAcitve}>
          수정하기
        </EditGroupBtn>
      </CreateGroupLayout>
    </>
  );
};

export default EditGroupInfo;
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
const GroupImagePreviewWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GroupNameInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;
const GroupInfoTextareaWrapper = styled.div`
  position: relative;
`;
const GroupNameValidationText = styled.p<{ validation: boolean }>`
  ${({ theme }) => theme.fonts.body4};
  color: ${({ theme, validation }) => (validation ? theme.colors.mainGreen : theme.colors.mileRed)};
`;
const EditGroupBtn = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5.1rem;

  color: ${({ theme, active }) => (active ? theme.colors.white : theme.colors.gray70)};

  background: ${({ theme, active }) => (active ? theme.colors.mainViolet : theme.colors.gray30)};
  cursor: default;
  border: 1px solid
    ${({ theme, active }) => (active ? theme.colors.mainViolet : theme.colors.gray30)};
  border-radius: 10px;

  ${({ theme }) => theme.fonts.button2};
  ${({ active, theme }) =>
    active &&
    `
    &:hover {
      color: ${theme.colors.mainViolet};
      background-color: ${theme.colors.mileViolet};
      border: 1px solid ${theme.colors.mileViolet};
    }
    cursor:pointer;
  `}
`;

const PublicInfoText = styled.p`
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.body3};
`;
const PublicInfoWrapper = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 5.7rem;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
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
  justify-content: flex-end;
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
  justify-content: flex-end;
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
const GroupInfoTextarea = styled.textarea<{ isValid: boolean }>`
  position: relative;
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
const TextAreaLength = styled.p<{ isValid: boolean }>`
  position: absolute;
  right: 1.2rem;
  bottom: 1rem;

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

const CreateGroupLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
  width: 82.6rem;
  height: fit-content;
  margin-bottom: 8rem;
`;
