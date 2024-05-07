import { client } from '../../../utils/apis/axios';

interface GroupNameValidationPropTypes {
  data: {
    isValidate: true;
  };
  status: number;
  message: string;
}

export const getGroupNameValidation = (moimName: string) => {
  if (localStorage.getItem('accessToken')) {
    const token = localStorage.getItem('accessToken');

    try {
      const data = client.get<GroupNameValidationPropTypes>(
        `api/moim/name/validation?moimName=${moimName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
          },
        },
      );

      return data;
    } catch (err) {
      console.log(err);
    }
  }
};
