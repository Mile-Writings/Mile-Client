import mainImgHotwriteLong from '../../../assets/images/mainImgHotwriteLong.png';

// export interface MoimPost {
//   topicName: string;
//   imageUrl: string | null;
//   postTitle: string;
//   postContent: string;
// }

// export interface Moim {
//   moimId: number;
//   moimName: string;
//   moimPosts: MoimPost[];
// }

// export interface Data {
//   moim: Moim[];
// }

// const data: Data = {
//   moim: [
//     {
//       moimId: 1,
//       moimName: '마일',
//       moimPosts: [
//         {
//           topicName: '주제',
//           imageUrl: mainImgHotwriteLong,
//           postTitle: '어쩌구',
//           postContent: '저쩌구',
//         },
//         {
//           topicName: '주제',
//           imageUrl: mainImgHotwriteLong,
//           postTitle: '어쩌구',
//           postContent: '저쩌구',
//         },
//         {
//           topicName: '주제',
//           imageUrl: mainImgHotwriteLong,
//           postTitle: '어쩌구',
//           postContent: '저쩌구',
//         },
//         {
//           topicName: '주제',
//           imageUrl: mainImgHotwriteLong,
//           postTitle: '어쩌구',
//           postContent: '저쩌구',
//         },
//       ],
//     },
//     {
//       moimId: 2,
//       moimName: '마일',
//       moimPosts: [
//         {
//           topicName: '주제',
//           imageUrl: mainImgHotwriteLong,
//           postTitle: '어쩌구',
//           postContent: '저쩌구',
//         },
//         {
//           topicName: '주제',
//           imageUrl: mainImgHotwriteLong,
//           postTitle: '어쩌구',
//           postContent: '저쩌구',
//         },
//         {
//           topicName: '주제',
//           imageUrl: mainImgHotwriteLong,
//           postTitle: '어쩌구',
//           postContent: '저쩌구',
//         },
//         {
//           topicName: '주제',
//           imageUrl: mainImgHotwriteLong,
//           postTitle: '어쩌구',
//           postContent: '저쩌구',
//         },
//       ],
//     },
//     {
//       moimId: 3,
//       moimName: '마일',
//       moimPosts: [
//         {
//           topicName: '주제',
//           imageUrl: mainImgHotwriteLong,
//           postTitle: '어쩌구',
//           postContent: '저쩌구',
//         },
//         {
//           topicName: '주제',
//           imageUrl: mainImgHotwriteLong,
//           postTitle: '어쩌구',
//           postContent: '저쩌구',
//         },
//         {
//           topicName: '주제',
//           imageUrl: mainImgHotwriteLong,
//           postTitle: '어쩌구',
//           postContent: '저쩌구',
//         },
//         {
//           topicName: '주제',
//           imageUrl: mainImgHotwriteLong,
//           postTitle: '어쩌구',
//           postContent: '저쩌구',
//         },
//       ],
//     },
//   ],
// };

// export default data;

export interface groupContentypes {
  id: number;
  topic: string;
  maintext: string;
  subtext: string;
  image: string | null;
  isLast: boolean;
}

const GROUP_CONTENT: groupContentypes[] = [
  {
    id: 1,
    topic: '글쓰기 주제가 입력될 공간',
    maintext: '작성된 글의 제목이 들어갈 공간입니다.',
    subtext:
      '텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 ...',
    image: mainImgHotwriteLong,
    isLast: false,
  },
  {
    id: 2,
    topic: '글쓰기 주제가 입력될 공간',
    maintext: '작성된 글의 제목이 들어갈 공간입니다.',
    subtext:
      '텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 ...',
    image: null,
    isLast: false,
  },
  {
    id: 3,
    topic: '글쓰기 주제가 입력될 공간',
    maintext: '작성된 글의 제목이 들어갈 공간입니다.',
    subtext:
      '텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 ...',
    image: null,
    isLast: false,
  },
  {
    id: 4,
    topic: '글쓰기 주제가 입력될 공간',
    maintext: '작성된 글의 제목이 들어갈 공간입니다.',
    subtext:
      '텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 공간입니다. 텍스트가 들어갈 ...',
    image: mainImgHotwriteLong,
    isLast: true,
  },
];

export default GROUP_CONTENT;
