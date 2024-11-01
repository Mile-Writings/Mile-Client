import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import { groupKey } from '../../groupFeed/hooks/queries';
import deleteGroup from '../apis/deleteGroup';
import {
  deleteAdminTopic,
  editAdminTopic,
  fetchAdminTopic,
  postAdminTopic,
  postAdminTopicPropTypes,
} from '../apis/fetchAdminData';
import fetchAdminGroupInfo from '../apis/fetchAdminGroupInfo';
import fetchDeleteMember from '../apis/fetchDeleteMember';
import { fetchInvitationLink } from '../apis/fetchInvitationLink';
import fetchMemberInfo from '../apis/fetchMemberInfo';
import putAdminEditGroupInfo, {
  AdminEditGroupInfoWithoutImage,
} from '../apis/putAdminEditGroupInfo';

export const QUERY_KEY_ADMIN = {
  useMemberInfo: 'fetchMemberInfo',
  fetchInvitationLink: 'fetchInvitationLink',
  fetchAdminGroupInfo: 'fetchAdminGroupInfo',
  putAdminEditGroupInfo: 'putAdminEditGroupInfo',
  deleteGroup: 'deleteGroup',
};
export const useAdminTopic = (groupId: string | undefined, pageNum: number) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['adminTopic', groupId, pageNum],
    queryFn: () => fetchAdminTopic(groupId, pageNum),
    retry: 1,
  });

  const topicCount = data && data.data.topicCount;
  const adminTopicData = data && data.data;

  return { topicCount, adminTopicData, isLoading, isError, error };
};

//[POST] 관리자페이지 글감 생성
export const usePostAdminTopic = (groupId: string | undefined, pageNum: number) => {
  const queryClient = useQueryClient();
  const { mutate, isError, error } = useMutation({
    mutationKey: ['adminTopic'],
    mutationFn: ({ topic, topicTag, topicDescription }: postAdminTopicPropTypes) =>
      postAdminTopic({ topic, topicTag, topicDescription, groupId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['adminTopic', groupId, pageNum],
      });
    },
    onError: (err) => {
      if (isAxiosError(err) && err.response?.status) {
        const errorCode = err.response?.data.status;
        console.log(errorCode, 'code');
        if (errorCode === 40005) {
          alert('요청 값에 빈 값이 존재합니다');
        } else if (errorCode === 40006) {
          alert('요청 값이 길이를 초과했습니다');
        } else {
          console.log(err.response.data.message);
        }
      }
    },
  });

  const postMutateAdminTopic = ({ topic, topicTag, topicDescription }: postAdminTopicPropTypes) =>
    mutate({ topic, topicTag, topicDescription, groupId });

  return { postMutateAdminTopic, isError, error };
};

// 멤버 정보 조회 get api
export const useFetchMemberInfo = (groupId: string, page: number | undefined) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY_ADMIN.useMemberInfo, page],
    queryFn: () => fetchMemberInfo(groupId || '', page),
  });
  const totalMember = data?.data.writerNameCount;
  const memberData = data?.data;
  const memberListData = data?.data.writerNameList;
  const pageNumber = data?.data.pageNumber;

  return { memberData, memberListData, totalMember, pageNumber, isLoading, page };
};

// 멤버 삭제 api
export const useDeleteMember = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: [QUERY_KEY_ADMIN.useMemberInfo],
    mutationFn: (writerNameId: number) => fetchDeleteMember(writerNameId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_ADMIN.useMemberInfo] });
    },
  });
  const deleteMember = (writerNameId: number) => {
    data.mutate(writerNameId);
  };

  return { deleteMember };
};

export const useFetchInvitationLink = (groupId: string | undefined) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY_ADMIN.fetchInvitationLink],
    queryFn: () => fetchInvitationLink(groupId || ''),
  });
  const invitationCode = data?.data;

  return { invitationCode };
};

interface editTopicPropType {
  topic: string;
  topicTag: string;
  topicDescription: string;
  topicId: string | undefined;
}

//[PUT] 관리자 페이지 글감 수정
export const useEditAdminTopic = (
  topicId: string | undefined,
  groupId: string | undefined,
  pageNum: number,
) => {
  const queryClient = useQueryClient();
  const { mutate, isError, error } = useMutation({
    mutationKey: ['adminTopic'],
    mutationFn: ({ topic, topicTag, topicDescription }: editTopicPropType) =>
      editAdminTopic({ topic, topicTag, topicDescription, topicId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['adminTopic', groupId, pageNum],
      });
    },
    onError: (err) => {
      if (isAxiosError(err) && err.response?.status) {
        const errorCode = err.response?.data.status;
        if (errorCode === 40005) {
          alert('요청 값에 빈 값이 존재합니다');
        } else if (errorCode === 40006) {
          alert('요청 값이 길이를 초과했습니다');
        } else {
          console.error();
        }
      }
    },
  });

  const editMutateAdminTopic = ({ topic, topicTag, topicDescription }: editTopicPropType) =>
    mutate({ topic, topicTag, topicDescription, topicId });

  return { editMutateAdminTopic, isError, error };
};

//[DELETE] 관리자페이지 글감삭제
export const useDeleteAdminTopic = (
  topicId: string,
  groupId: string | undefined,
  pageNum: number,
) => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: ['adminTopic', topicId],
    mutationFn: () => deleteAdminTopic(topicId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['adminTopic', groupId, pageNum],
      });
    },
    onError: (err) => {
      if (isAxiosError(err) && err.response?.status) {
        const errorCode = err.response?.data.status;
        if (errorCode === 40015) {
          alert('모임에 최소 하나의 글감이 있어야 합니다');
        } else {
          console.error();
        }
      }
    },
  });

  const deleteMutateAdminTopic = () => {
    data.mutate();
  };
  return { deleteMutateAdminTopic };
};

//모임 정보 수정 정보 get
export const useFetchGroupInfo = (groupId: string) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY_ADMIN.fetchAdminGroupInfo, groupId],
    queryFn: () => fetchAdminGroupInfo(groupId),
  });
  return data?.data?.data;
};

//모임 정보 수정
export const usePutAdminGroupInfo = ({
  groupName,
  groupDesc,

  isPublic,
  groupId,
}: AdminEditGroupInfoWithoutImage) => {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isError } = useMutation({
    mutationKey: [QUERY_KEY_ADMIN.putAdminEditGroupInfo, groupId],
    mutationFn: (groupImageServerUrl: string) =>
      putAdminEditGroupInfo({ groupName, groupDesc, groupImageServerUrl, isPublic, groupId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: groupKey.detail(groupId || ''),
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_ADMIN.fetchAdminGroupInfo, groupId],
      });
      alert('글모임 정보가 수정되었습니다.');
    },
    onError: (err) => {
      if (isAxiosError(err) && err.response?.status) {
        const errorCode = err.response?.data.status;

        if (err?.response?.status === 500) {
          alert('서버내부 오류입니다. ');
        } else if (err?.response.status === 400) {
          if (errorCode === 40005) {
            alert('요청 값에 빈 값이 존재합니다');
          } else if (errorCode === 40006) {
            alert('요청 값이 길이를 초과했습니다');
          } else if (errorCode === 40018) {
            alert('사용 불가능한 모임명입니다');
          } else if (errorCode === 40005) {
            alert('요청에 빈 값이 존재합니다.');
          } else {
            console.error();
          }
        } else if (err?.response?.status === 401) {
          alert('파일 형식을 확인해주세요');
        } else if (err?.response?.status === 413) {
          alert(`파일 형식을 확인해주세요 Error Code ${err.response.status}`);
        } else {
          alert(`${JSON.stringify(err?.response)}`);
        }
      }
    },
  });

  return { mutate, isSuccess, isError };
};

//모임 정보 삭제
export const useDeleteGroup = (groupId: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isError, isPending } = useMutation({
    mutationKey: [QUERY_KEY_ADMIN.deleteGroup, groupId],
    mutationFn: () => deleteGroup(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_ADMIN.fetchAdminGroupInfo, groupId],
      });
      navigate('/');
    },
  });

  return { mutate, isError, isPending };
};
