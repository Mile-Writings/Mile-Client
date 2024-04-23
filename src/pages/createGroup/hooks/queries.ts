import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getGroupNameValidation } from '../apis/getGroupNameValidation';
import { CreateGroupRequestTypes, postCreateGroup } from '../apis/postGroup';

export const QUERY_KEY_CREATE_GROUP = {
  getGroupNameValidation: 'getGroupNameValidation',
  postCreateGroup: 'postCreateGroup',
};

export const useGetGroupNameValidation = (moimName: string) => {
  const data = useQuery({
    queryKey: [QUERY_KEY_CREATE_GROUP.getGroupNameValidation, moimName],
    queryFn: () => getGroupNameValidation(moimName),
    refetchOnWindowFocus: false,
    enabled: false,
    retry: 0,
  });

  return data;
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_CREATE_GROUP.postCreateGroup] });
    },
  });

  return { mutate, data };
};
