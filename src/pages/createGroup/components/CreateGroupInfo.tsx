import styled from '@emotion/styled';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { CurrentPageType } from '../types/stateType';

import {
  CreateGroupImageUpload,
  CreateGroupInfoIc,
  CreateGroupRadioCheckedIc,
  CreateGroupRadioUncheckedIc,
} from '../../../assets/svgs';
import { AuthorizationHeader, UnAuthorizationHeader } from '../../../components/commons/Header';
import Spacing from '../../../components/commons/Spacing';

interface CreateGroupInfoPropTypes {
  setCurrentPage: Dispatch<SetStateAction<CurrentPageType['currentPage']>>;
  groupName: string;
  setGroupName: (e: ChangeEvent<HTMLInputElement>) => void;
  setGroupInfo: (e: ChangeEvent<HTMLInputElement>) => void;
  groupImageFile: string;
  setGroupImageFile: (image: string) => void;
  isPublic: boolean;
  setIsPublic: (e: ChangeEvent<HTMLInputElement>) => void;
  setTopic: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CreateGroupInfo = ({
  setCurrentPage,
  groupName,
  setGroupName,
  setGroupInfo,
  groupImageFile,
  setGroupImageFile,
  isPublic,
  setIsPublic,
  setTopic,
}: CreateGroupInfoPropTypes) => {
  // const [groupName, setGroupName] = useState('');
  // const [groupInfo, setGroupInfo] = useState('');
  // const [groupPicture, setGroupPicture] = useState('');

  // const [groupImageFile, setGroupImageFile] = useState('');
  // const [isPublic, setIsPublic] = useState(true);

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
          console.log(reader.result);
          setGroupImageFile(reader.result);
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

    // reader의 loadend 이벤트가 완료될 때까지 기다린 후 이미지 URL을 설정합니다.
    // await new Promise((resolve) => (reader.onloadend = resolve));

    // setImageUrl(file);
  };

  const handleDuplicateGroupName = () => {
    alert('중복확인 로직');
  };
  const handleIsPublic = (e) => {
    console.log(e.target.value + '함수 작동');
    setIsPublic(e.target.value);
  };

  return (
    <CreateGroupWrapper>
      {localStorage.getItem('accessToken') ? <AuthorizationHeader /> : <UnAuthorizationHeader />}
      <CreateGroupLayout>
        <TitleWrapper>
          <SubTitle>안녕하세요. 마일에 오신 것을 환영합니다</SubTitle>
          <Spacing marginBottom="1.1" />
          <Title>나만의 글 모임을 만들어보세요</Title>
          <Spacing marginBottom="4.8" />
          <GreyBox />
        </TitleWrapper>
        <WhiteInputWrapper>
          <GroupInputWrapper>
            <InputTitleText>글 모임 이름*</InputTitleText>
            <GroupNameInputLayout>
              <GroupNameInput
                onChange={(e) => setGroupName(e)}
                placeholder="띄어쓰기 포함 10자 이내로 입력해주세요."
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
          </GroupInputWrapper>
        </WhiteInputWrapper>
        <WhiteInputWrapper>
          <GroupInputWrapper>
            <InputTitleText>글 모임 소개</InputTitleText>
            <GroupInfoTextarea placeholder="글 모임에 대해 자유롭게 소개해주세요." />
          </GroupInputWrapper>
        </WhiteInputWrapper>
        <WhiteInputWrapper>
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
        <WhiteInputWrapper>
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
        <WhiteInputWrapper>
          <GroupInputHorizonWrapper>
            <TopicSettingWrapper>
              <TopicSettingText>글모임 생성 전에 첫번째 글감을 설정해보세요*</TopicSettingText>
              <TopicSettingAdditionalText>
                관리자 페이지에서 언제든지 수정 가능합니다.
              </TopicSettingAdditionalText>
            </TopicSettingWrapper>
            <TopicCreateBtn>글감 작성하기</TopicCreateBtn>
          </GroupInputHorizonWrapper>
        </WhiteInputWrapper>
        <NextBtn>다음</NextBtn>
      </CreateGroupLayout>
    </CreateGroupWrapper>
  );
};

export default CreateGroupInfo;

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

const CreateGroupWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 11.4rem;
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

const WhiteInputWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: fit-content;

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

const GroupNameInput = styled.input`
  width: 100%;
  height: 3.9rem;
  padding: 1rem 1.2rem;

  color: ${({ theme }) => theme.colors.gray100};

  background: ${({ theme }) => theme.colors.gray5};
  border: 1px solid ${({ theme }) => theme.colors.gray20};
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

const GroupInfoTextarea = styled.textarea`
  width: 100%;
  height: 11rem;
  padding: 1rem 1.2rem;

  color: ${({ theme }) => theme.colors.gray100};

  background: ${({ theme }) => theme.colors.gray5};
  border: 1px solid ${({ theme }) => theme.colors.gray20};
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
