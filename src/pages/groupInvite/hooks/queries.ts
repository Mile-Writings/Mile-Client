import { useQuery } from '@tanstack/react-query';

import { fetchGroupInfo } from '../apis/fetchGroupInfo';

export const QUERY_KEY_GROUP_INVITE = {
  getGroupInfo: 'getGroupInfo',
};

// 글 모임 정보 가져오기
export const useGetGroupInfo = (groupId: string) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY_GROUP_INVITE.getGroupInfo, groupId],
    queryFn: () => fetchGroupInfo(groupId),
  });

  const moimTitle = data && data.data.moimTitle;
  const imageUrl = data && data.data.imageUrl;
  const leader = data && data.data.leader;
  const memberCount = data && data.data.memberCount;
  const description = data && data.data.description;

  return { moimTitle, imageUrl, leader, memberCount, description };
};
