import { useQuery } from '@tanstack/react-query';

import { fetchTempSaveFlag } from '../apis/fetchTempSaveFlag';

export const QUERY_KEY_POST = {
  getTempSaveFlag: 'getTempSaveFlag',
};

// 임시저장 여부 확인 GET api
interface TempSaveFlagQueryResult {
  isTemporaryPostExist: boolean | undefined;
  postId: string | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export const useTempSaveFlag = (groupId: string): TempSaveFlagQueryResult => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QUERY_KEY_POST.getTempSaveFlag, groupId],
    queryFn: () => fetchTempSaveFlag(groupId),
  });

  const isTemporaryPostExist = data && data.data.isTemporaryPostExist;
  const postId = data && data.data.postId;

  return { isTemporaryPostExist, postId, isLoading, isError, error };
};
