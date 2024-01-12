import mainImgHotwriteLong from '../../../assets/images/mainImgHotwriteLong.png';

export interface MoimPost {
  topicName: string;
  imageUrl: string | null;
  postTitle: string;
  postContent: string;
}

export interface Moim {
  moimId: number;
  moimName: string;
  moimPosts: MoimPost[];
}

export interface Data {
  moim: Moim[];
}

const data: Data = {
  moim: [
    {
      moimId: 1,
      moimName: '마일',
      moimPosts: [
        {
          topicName: '주제',
          imageUrl: mainImgHotwriteLong,
          postTitle: '어쩌구',
          postContent: '저쩌구',
        },
        {
          topicName: '주제',
          imageUrl: mainImgHotwriteLong,
          postTitle: '어쩌구',
          postContent: '저쩌구',
        },
        {
          topicName: '주제',
          imageUrl: mainImgHotwriteLong,
          postTitle: '어쩌구',
          postContent: '저쩌구',
        },
        {
          topicName: '주제',
          imageUrl: mainImgHotwriteLong,
          postTitle: '어쩌구',
          postContent: '저쩌구',
        },
      ],
    },
    {
      moimId: 2,
      moimName: '마일',
      moimPosts: [
        {
          topicName: '주제',
          imageUrl: mainImgHotwriteLong,
          postTitle: '어쩌구',
          postContent: '저쩌구',
        },
        {
          topicName: '주제',
          imageUrl: mainImgHotwriteLong,
          postTitle: '어쩌구',
          postContent: '저쩌구',
        },
        {
          topicName: '주제',
          imageUrl: mainImgHotwriteLong,
          postTitle: '어쩌구',
          postContent: '저쩌구',
        },
        {
          topicName: '주제',
          imageUrl: mainImgHotwriteLong,
          postTitle: '어쩌구',
          postContent: '저쩌구',
        },
      ],
    },
    {
      moimId: 3,
      moimName: '마일',
      moimPosts: [
        {
          topicName: '주제',
          imageUrl: mainImgHotwriteLong,
          postTitle: '어쩌구',
          postContent: '저쩌구',
        },
        {
          topicName: '주제',
          imageUrl: mainImgHotwriteLong,
          postTitle: '어쩌구',
          postContent: '저쩌구',
        },
        {
          topicName: '주제',
          imageUrl: mainImgHotwriteLong,
          postTitle: '어쩌구',
          postContent: '저쩌구',
        },
        {
          topicName: '주제',
          imageUrl: mainImgHotwriteLong,
          postTitle: '어쩌구',
          postContent: '저쩌구',
        },
      ],
    },
  ],
};

export default data;
