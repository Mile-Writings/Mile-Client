import { DEFAULT_IMG_URL } from '../../../constants/defaultImgUrl';
import { authClient } from '../../../utils/apis/axios';

export interface AdminEditGroupInfoPropTypes {
  groupName: string;
  groupDesc: string;
  groupImageServerUrl: string;
  isPublic: boolean;
  groupId: string | undefined;
}

const putAdminEditGroupInfo = async ({
  groupName,
  groupDesc,
  isPublic,
  groupImageServerUrl,
  groupId,
}: AdminEditGroupInfoPropTypes) => {
  try {
    await authClient.put(`/api/moim/${groupId}/info`, {
      moimTitle: groupName,
      description: groupDesc,
      imageUrl: groupImageServerUrl || DEFAULT_IMG_URL,
      isPublic: isPublic,
    });
  } catch (err) {
    console.error(err);
  }
};

export default putAdminEditGroupInfo;
