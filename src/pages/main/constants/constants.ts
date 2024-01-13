import mainImgHotwriteLong from '../../../assets/images/mainImgHotwriteLong.png';

export interface MoimPostPropTypes {
  topicName: string;
  imageUrl: string | null;
  postTitle: string;
  postContent: string;
}

export interface MoimPropTypes {
  moimId: number;
  moimName: string;
  moimPosts: MoimPostPropTypes[];
}

export interface DataPropTypes {
  moim: MoimPropTypes[];
}

const CAROUSEL_DATA: DataPropTypes = {
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

export default CAROUSEL_DATA;
