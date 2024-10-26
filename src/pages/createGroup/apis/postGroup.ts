import { authClient } from '../../../utils/apis/axios';

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
  groupImageUrl: string;
  leaderPenName: string;
  leaderDesc?: string;
  topic: string;
  topicTag: string;
  topicDesc?: string;
}

export const postCreateGroup = ({
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
    const data = authClient.post<CreateGroupPropTyeps>(`api/moim`, {
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
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
