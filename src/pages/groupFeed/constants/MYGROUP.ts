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
        { groupId: '1', groupName: '작미' },
        { groupId: '2', groupName: '나우솝트' },
        { groupId: '3', groupName: '새싹웨비들' },
        { groupId: '4', groupName: '여덟글자까지가능' },
      ],
    },
  },
];
