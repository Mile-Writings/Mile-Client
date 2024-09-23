import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { getGroupNameValidation } from '../apis/getGroupNameValidation';
import { CreateGroupRequestTypes, postCreateGroup } from '../apis/postGroup';
import { isAxiosError } from 'axios';

export const QUERY_KEY_CREATE_GROUP = {
  getGroupNameValidation: 'getGroupNameValidation',
  postCreateGroup: 'postCreateGroup',
};

export const useGetGroupNameValidation = (moimName: string) => {
  const queryClient = useQueryClient();
  const { data, refetch, isSuccess, isError, error } = useQuery({
    queryKey: [QUERY_KEY_CREATE_GROUP.getGroupNameValidation, moimName],
    queryFn: () => getGroupNameValidation(moimName),
    enabled: false,
    retry: 0,
    throwOnError: true,
  });
  queryClient.removeQueries({ queryKey: [QUERY_KEY_CREATE_GROUP.getGroupNameValidation] });
  return { data, refetch, isSuccess, isError, error };
};

export const usePostCreateGroup = ({
  groupName,
  groupInfo,
  isPublic,
  groupImageFile,
  leaderPenName,
  leaderDesc,
  topic,
  topicTag,
  topicDesc,
}: CreateGroupRequestTypes) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, data } = useMutation({
    mutationKey: [
      QUERY_KEY_CREATE_GROUP.postCreateGroup,
      {
        groupName,
        groupInfo,
        isPublic,
        groupImageFile,
        leaderPenName,
        leaderDesc,
        topic,
        topicTag,
        topicDesc,
      },
    ],
    mutationFn: () =>
      postCreateGroup({
        groupName,
        groupInfo,
        isPublic,
        groupImageFile,
        leaderPenName,
        leaderDesc,
        topic,
        topicTag,
        topicDesc,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_CREATE_GROUP.postCreateGroup] });
      navigate(`/group/success/${data.data.data.moimId}`);
    },
    onError: (err) => {
      if (isAxiosError(err) && err.response?.status) {
        const errorCode = err.response?.data.status;
        if (errorCode === 40005) {
          alert('요청 값에 빈 값이 존재합니다');
          window.location.reload();
        } else if (errorCode === 40006) {
          alert('요청 값이 길이를 초과했습니다');
        } else if (errorCode === 40018) {
          alert('사용불가능한 모임명입니다');
        } else if (errorCode === 40019) {
          alert('최대 가입 가능 모임 개수를 초과했습니다');
        } else {
          console.error();
        }
      }
    },
  });

  return { mutate, data };
};
