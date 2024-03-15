export interface Groups {
  groupId: string;
  groupName: string;
}

export interface FetchGroupResponseTypes {
  data: {
    groups: Groups[];
  };
  // status: number;
  // message: string;
}

export const MYGROUP = [
  {
    data: {
      groups: [
        { groupId: 'MQ==', groupName: '마일' },
        { groupId: 'MQ==', groupName: '나우솝트' },
        { groupId: 'MQ==', groupName: '작미들라뷰' },
        { groupId: 'MQ==', groupName: '나우솝트두근' },
        { groupId: 'MQ==', groupName: '여덟글자까지가능' },
      ],
    },
  },
];
