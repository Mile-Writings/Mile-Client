import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { getGroupNameValidation } from '../apis/getGroupNameValidation';
import { CreateGroupRequestTypes, postCreateGroup } from '../apis/postGroup';

export const QUERY_KEY_CREATE_GROUP = {
  getGroupNameValidation: 'getGroupNameValidation',
  postCreateGroup: 'postCreateGroup',
};

export const useGetGroupNameValidation = (moimName: string) => {
  const queryClient = useQueryClient();
  const { data, refetch, isSuccess, error } = useQuery({
    queryKey: [QUERY_KEY_CREATE_GROUP.getGroupNameValidation, moimName],
    queryFn: () => getGroupNameValidation(moimName),
    refetchOnWindowFocus: false,
    enabled: false,
    retry: 0,
  });
  queryClient.removeQueries({ queryKey: [QUERY_KEY_CREATE_GROUP.getGroupNameValidation] });
  return { data, refetch, isSuccess, error };
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
  });

  return { mutate, data };
};
