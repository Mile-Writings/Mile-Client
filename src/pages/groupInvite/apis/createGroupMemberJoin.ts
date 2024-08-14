import { authClient } from '../../../utils/apis/axios';

interface groupMemberJoinType {
  groupId: string;
  writerName: string;
  writerDescription: string;
}

interface PostGroupJoinMemberResponseType {
  status: number;
  message: string;
}

export const createGroupMemberJoin = async ({
  groupId,
  writerName,
  writerDescription,
}: groupMemberJoinType) => {
  try {
    const { data } = await authClient.post<PostGroupJoinMemberResponseType>(
      `/api/moim/${groupId}/user`,
      {
        moimId: groupId,
        writerName: writerName,
        writerDescription: writerDescription,
      },
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
