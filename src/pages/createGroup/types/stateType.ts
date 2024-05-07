export interface CreateGroupTypes {
  groupName: string;
  groupInfo: string;
  groupImageFile: string;
  isPublic: boolean;
  topic: string;
  topicTag: string;
  topicDesc: string;
  leaderPenName: string;
  leaderDesc: string;
}

export interface ActionTypes {
  type: string;
  value: string;
}

export interface CurrentPageType {
  currentPage: 'GroupInfoPage' | 'GroupLeaderInfoPage';
}
