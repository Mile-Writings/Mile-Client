import { devClient } from '../../../utils/apis/axios';

interface MembersListTypes {
  pageNumber: number;
  writerNameCount: number;
  writerNameList: {
    writerNameId: number;
    writerName: string;
    postCount: number;
    commentCount: number;
  };
}

const fetchDeleteMember = async (writerNameId: number | undefined) => {
  const token = localStorage.getItem('accessToken');
  const data = await devClient.delete<MembersListTypes>(`/api/writername/${writerNameId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export default fetchDeleteMember;
