import { client } from '../../../utils/apis/axios';

export const fetchGroupFeedAuth = async (groupId: string) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await client.get(`/api/moim/${groupId}/authenticate`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data; //"isMember" : boolean
  } catch (error) {
    console.error('에러:', error);
  }
};

export const fetchGroupInfo = async (groupId: string) => {
  try {
    const response = await client.get(`/api/moim/${groupId}/info`);

    return response.data;
  } catch (error) {
    console.error('에러:', error);
  }
};
