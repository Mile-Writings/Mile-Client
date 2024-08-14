import { client } from '../../../utils/apis/axios';

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
    const token = localStorage.getItem('accessToken');
    const { data } = await client.post<PostGroupJoinMemberResponseType>(
      `/api/moim/${groupId}/user`,
      {
        moimId: groupId,
        writerName: writerName,
        writerDescription: writerDescription,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
