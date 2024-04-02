import { client } from '../../../utils/apis/axios';

export interface Members {
  profileImage: string;
  writerNameId: string;
  writerName: string;
  email: string;
}

export interface FetchMemberPropTypes {
  status: number;
  message: string;
  data: {
    writerNameCount: number;
    writerNameList: Members[];
  };
}

const getMemberInfo = async (moimId: string) => {
  try {
    // 이후에 수정할 예정
    const { data } = await client.get<FetchMemberPropTypes>(
      `/api/moim/:moimId/writerNameList?page=${moimId}`,
    );
    return data.data;
  } catch (error) {
    console.error();
  }
};

export default getMemberInfo;
