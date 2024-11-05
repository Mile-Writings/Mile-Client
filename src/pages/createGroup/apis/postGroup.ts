import { authClient } from '../../../utils/apis/axios';

interface CreateGroupPropTyeps {
  data: {
    accessToken: string;
    response: {
      moimId: string;
      inviteCode: string;
    };
  };
  status: number;
  message: string;
}
export interface CreateGroupRequestTypes {
  groupName: string;
  groupInfo?: string;
  groupImageUrl: string;
  isPublic: boolean;
  leaderPenName: string;
  leaderDesc?: string;
  topic: string;
  topicTag: string;
  topicDesc?: string;
}

export type CreateGroupRequestWithoutImageUrl = Omit<CreateGroupRequestTypes, 'groupImageUrl'>;
export const postCreateGroup = async ({
  groupName,
  groupInfo,
  groupImageUrl,
  isPublic,
  topic,
  topicTag,
  topicDesc,
  leaderPenName,
  leaderDesc,
}: CreateGroupRequestTypes) => {
  try {
    const data = await authClient.post<CreateGroupPropTyeps>(`api/moim`, {
      moimName: groupName,
      moimDescription: groupInfo,
      isPublic: isPublic,
      imageUrl: groupImageUrl,
      writerName: leaderPenName,
      writerNameDescription: leaderDesc,
      topic: topic,
      topicTag: topicTag,
      topicDescription: topicDesc,
    });

    return data.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
