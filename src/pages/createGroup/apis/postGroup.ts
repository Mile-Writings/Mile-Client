import { client } from '../../../utils/apis/axios';

interface CreateGroupPropTyeps {
  data: {
    moimId: string;
    inviteCode: string;
  };
  status: number;
  message: string;
}
export interface CreateGroupRequestTypes {
  groupName: string;
  groupInfo?: string;
  isPublic: boolean;
  groupImageFile: string;
  leaderPenName: string;
  leaderDesc?: string;
  topic: string;
  topicTag: string;
  topicDesc?: string;
}

export const postCreateGroup = ({
  groupName,
  groupInfo,
  groupImageFile,
  isPublic,
  topic,
  topicTag,
  topicDesc,
  leaderPenName,
  leaderDesc,
}: CreateGroupRequestTypes) => {
  const token = localStorage.getItem('accessToken');

  try {
    const data = client.post<CreateGroupPropTyeps>(
      `api/moim`,
      {
        moimName: groupName,
        moimDescription: groupInfo,
        isPublic: isPublic,
        imageUrl: groupImageFile,
        writerName: leaderPenName,
        writerNameDescription: leaderDesc,
        topic: topic,
        topicTag: topicTag,
        topicDescription: topicDesc,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
