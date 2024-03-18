import adminImgProfile from '../../../assets/images/adminImgProfile.png';

export interface Members {
  profileImage: string;
  penName: string;
  email: string;
}

export interface FetchMemberPropTypes {
  data: {
    members: Members[];
  };
  // status: number;
  // message: string;
}

export const MEMBER = [
  {
    data: {
      members: [
        {
          profileImage: adminImgProfile,
          penName: '일이삼사오육칠',
          email: 'milewriting@gmail.com',
        },
        { profileImage: adminImgProfile, penName: '나는누구', email: 'milewriting@gmail.com' },
        { profileImage: adminImgProfile, penName: '쾌활한 딸기', email: 'milewriting@gmail.com' },
        { profileImage: adminImgProfile, penName: '일이삼', email: 'milewriting@gmail.com' },
        { profileImage: adminImgProfile, penName: '마일', email: 'milewriting@gmail.com' },
      ],
    },
  },
];
