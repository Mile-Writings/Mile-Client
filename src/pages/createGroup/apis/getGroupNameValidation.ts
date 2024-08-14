import { isAxiosError } from 'axios';

import { authClient } from '../../../utils/apis/axios';

interface GroupNameValidationPropTypes {
  data: {
    isValidate: boolean;
  };
  status: number;
  message: string;
}

export const getGroupNameValidation = (moimName: string) => {
  try {
    const data = authClient.get<GroupNameValidationPropTypes>(
      `api/moim/name/validation?moimName=${moimName}`,
    );
    return data;
  } catch (err) {
    if (isAxiosError(err)) {
      console.log(err);
    }
  }
};
