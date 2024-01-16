import { useQuery } from '@tanstack/react-query';

import { fetchTempSaveFlag } from '../apis/fetchTempSaveFlag';

interface TempSaveFlagQueryResult {
  isTemporaryPostExist: boolean | undefined;
  postId: string | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export const useTempSaveFlag = (groupId: string): TempSaveFlagQueryResult => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['temp_save_flag', groupId],
    queryFn: () => fetchTempSaveFlag(groupId),
  });

  console.log(data);
  const isTemporaryPostExist = data && data.data.isTemporaryPostExist;
  const postId = data && data.data.postId;

  return { isTemporaryPostExist, postId, isLoading, isError, error };
};
