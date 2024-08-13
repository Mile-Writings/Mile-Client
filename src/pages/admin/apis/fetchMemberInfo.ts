import { devClient } from '../../../utils/apis/axios';

export interface MembersListTypes {
  writerNameId: number;
  writerName: string;
  postCount: number;
  commentCount: number;
}
[];

export interface FetchMemberPropTypes {
  status: number;
  message: string;
  data: {
    pageNumber: number;
    writerNameCount: number;
    writerNameList: {
      writerNameId: number;
      writerName: string;
      postCount: number;
      commentCount: number;
      isOwner: boolean;
    }[];
  };
}

export interface MemberPropTypes {
  pageNumber: number;
  writerNameCount: number;
  writerNameList: MembersListTypes[];
}

const fetchMemberInfo = async (groupId: string, page: number | undefined) => {
  const token = localStorage.getItem('accessToken');
  const data = await devClient.get<FetchMemberPropTypes>(
    `/api/moim/${groupId}/writernames?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data.data;
};

export default fetchMemberInfo;
