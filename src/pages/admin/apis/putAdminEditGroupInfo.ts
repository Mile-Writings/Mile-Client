import { DEFAULT_IMG_URL } from '../../../constants/defaultImgUrl';
import { authClient } from '../../../utils/apis/axios';

export interface AdminEditGroupInfoPropTypes {
  groupName: string;
  groupDesc: string;
  groupImageServerUrl: string;
  isPublic: boolean;
  groupId: string | undefined;
}
export type AdminEditGroupInfoWithoutImage = Omit<
  AdminEditGroupInfoPropTypes,
  'groupImageServerUrl'
>;

const putAdminEditGroupInfo = async ({
  groupName,
  groupDesc,
  isPublic,
  groupImageServerUrl,
  groupId,
}: AdminEditGroupInfoPropTypes) => {
  await authClient.put(`/api/moim/${groupId}/info`, {
    moimTitle: groupName,
    description: groupDesc,
    imageUrl: groupImageServerUrl || DEFAULT_IMG_URL,
    isPublic: isPublic,
  });
};

export default putAdminEditGroupInfo;
