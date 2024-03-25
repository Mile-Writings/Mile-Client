import { client } from '../../../utils/apis/axios';

export interface Members {
  profileImage: string;
  writerNameId: string;
  writerName: string;
  email: string;
}

export interface FetchMemberPropTypes {
  data: {
    writerNameCount: number;
    writerNameList: Members[];
  };
  // status: number;
  // message: string;
}

const getMemberInfo = async () => {
  try {
    // 이후에 수정할 예정
    const { data } = await client.get<FetchMemberPropTypes>(
      '/api/moim/:moimId/writerNameList?page=N',
    );
    return data.data;
  } catch (error) {
    console.error();
  }
};

export default getMemberInfo;
