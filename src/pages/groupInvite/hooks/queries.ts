import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { createGroupMemberJoin } from '../apis/createGroupMemberJoin';
import { fetchGroupInfo } from '../apis/fetchGroupInfo';
import { fetchWriterNameConflict } from '../apis/fetchWriterNameConflict';
import { isAxiosError } from 'axios';
import { authClient } from '../../../utils/apis/axios';

export const QUERY_KEY_GROUP_INVITE = {
  getGroupInfo: 'getGroupInfo',
  getWriterNameConflict: 'getWriterNameConflict',
  postGroupMemberJoin: 'postGroupMemeberJoin',
};

// 글 모임 정보 가져오기
export const useGetGroupInfo = (groupId: string) => {
  const { data, error, isError } = useQuery({
    queryKey: [QUERY_KEY_GROUP_INVITE.getGroupInfo, groupId],
    queryFn: () => fetchGroupInfo(groupId),
    retry: false,
  });

  const moimTitle = data && data?.data?.moimTitle;
  const imageUrl = data && data?.data?.imageUrl;
  const leader = data && data?.data?.leader;
  const foundedDate = data && data?.data?.foundedDate;
  const memberCount = data && data?.data?.memberCount;
  const description = data && data?.data?.description;
  return { moimTitle, imageUrl, leader, foundedDate, memberCount, description, error, isError };
};

// 필명 중복 여부 확인
export const useGetWriterNameConflict = (
  groupId: string,
  writerName: string,
  isConflictBtnClicked: boolean,
) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY_GROUP_INVITE.getWriterNameConflict, groupId, writerName],
    queryFn: () => fetchWriterNameConflict(groupId, writerName),
    enabled: !!isConflictBtnClicked,
  });

  const isWriterNameConflict = data && data?.data?.isConflict;
  return { isWriterNameConflict };
};

// 초대링크를 통한 글모임 사용자 가입
interface postGroupMemberJoinType {
  groupId: string;
  writerName: string;
  writerDescription: string;
  moimTitle: string;
}
export const usePostGroupMemberJoin = ({
  groupId,
  writerName,
  writerDescription,
  moimTitle,
}: postGroupMemberJoinType) => {
  const navigate = useNavigate();
  const { mutate, data, error } = useMutation({
    mutationKey: [
      QUERY_KEY_GROUP_INVITE.postGroupMemberJoin,
      {
        groupId,
        writerName,
        writerDescription,
      },
    ],
    mutationFn: () => createGroupMemberJoin({ groupId, writerName, writerDescription }),
    retry: 1,
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.data.accessToken);
      authClient.defaults.headers['Authorization'] = `Bearer ${data.data.accessToken}`;

      navigate(`/group/${groupId}/groupJoin`, {
        state: {
          moimTitle: moimTitle,
        },
      });
    },
    onError: (err) => {
      if (isAxiosError(err) && err.response?.status) {
        const errorCode = err.response?.data.status;
        if (errorCode === 40016) {
          navigate(`/group/${groupId}`, {
            state: {
              moimTitle: moimTitle,
            },
          });
        } else if (errorCode === 40014 || errorCode === 40010) {
          navigate('/error');
        } else {
          console.error();
        }
      }
    },
  });
  return { mutate, data, error };
};
