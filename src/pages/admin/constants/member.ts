// export interface Members {
//   writerNameId: string;
//   writerName: string;
//   postNumber: number;
//   commentNumber: number;
// }

// export interface FetchMemberPropTypes {
//   data: {
//     writerNameCount: number;
//     writerNameList: Members[];
//   };
//   // status: number;
//   // message: string;
// }

export const MEMBER = [
  {
    data: {
      writerNameCount: 5,
      writerNameList: [
        {
          writerNameId: '1',
          writerName: '일이삼사오육칠',
          postNumber: 999,
          commentNumber: 999,
        },
        {
          writerNameId: '2',
          writerName: '나는누구',
          postNumber: 3,
          commentNumber: 10,
        },
        {
          writerNameId: '3',
          writerName: '쾌활한 딸기',
          postNumber: 90,
          commentNumber: 100,
        },
        {
          writerNameId: '4',
          writerName: '일이삼',
          postNumber: 130,
          commentNumber: 89,
        },
        {
          writerNameId: '5',
          writerName: '마일',
          postNumber: 14,
          commentNumber: 30,
        },
      ],
    },
  },
];
