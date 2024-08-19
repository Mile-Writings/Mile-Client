import { client } from '../../../utils/apis/axios';

interface PresignedUrlPropTypes {
  data: { fileName: string; url: string };
}

export const fetchPresignedUrl = async () => {
  try {
    const response = await client.get<PresignedUrlPropTypes>(`/api/image/upload`);
    return response.data;
  } catch (err) {
    console.error('에러');
  }
};
