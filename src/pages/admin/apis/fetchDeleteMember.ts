import { authClient } from '../../../utils/apis/axios';

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
  try {
    const data = await authClient.delete<MembersListTypes>(`/api/writername/${writerNameId}`);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export default fetchDeleteMember;
