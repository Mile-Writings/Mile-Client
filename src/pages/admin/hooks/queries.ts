import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

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
import putAdminEditGroupInfo, { AdminEditGroupInfoPropTypes } from '../apis/putAdminEditGroupInfo';

import { QUERY_KEY_GROUPFEED } from '../../groupFeed/hooks/queries';

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
  });

  const postMutateAdminTopic = ({ topic, topicTag, topicDescription }: postAdminTopicPropTypes) =>
    mutate({ topic, topicTag, topicDescription, groupId });

  return { postMutateAdminTopic, isError, error };
};

// 멤버 정보 조회 get api
export const useFetchMemberInfo = (groupId: string, page: number | undefined) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEY_ADMIN.useMemberInfo, page],
    queryFn: () => fetchMemberInfo(groupId || '', page),
  });
  const totalMember = data?.data.writerNameCount;
  const memberData = data?.data;
  const memberListData = data?.data.writerNameList;
  const pageNumber = data?.data.pageNumber;

  return { memberData, memberListData, totalMember, pageNumber, isLoading, page, error };
};

// 멤버 삭제 api
export const useDeleteMember = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const data = useMutation({
    mutationKey: [QUERY_KEY_ADMIN.useMemberInfo],
    mutationFn: (writerNameId: number) => fetchDeleteMember(writerNameId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_ADMIN.useMemberInfo] });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        switch (error.response?.data.status) {
          case 40103: // 비공개 글모임인 경우, 로그인을 진행하지 않고 요청을 보냈을 때
            alert('로그인이 필요한 서비스입니다.');
            navigate('/login');
            break;
          case 40411: // 삭제하고자 하는 멤버가 존재하지 않을 때
            alert('해당 멤버가 존재하지 않습니다. 새로고침 하시겠습니까?');
            window.location.reload();
            break;
          default:
            alert('에러가 발생했습니다. 다시 시도해 주세요');
            navigate('/');
        }
      }
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
  });

  const deleteMutateAdminTopic = () => {
    data.mutate();
  };
  return { deleteMutateAdminTopic };
};

//모임 정보 수정 정보 get
export const useFetchGroupInfo = (groupId: string) => {
  const data = useQuery({
    queryKey: [QUERY_KEY_ADMIN.fetchAdminGroupInfo, groupId],
    queryFn: () => fetchAdminGroupInfo(groupId),
  });

  return data;
};

//모임 정보 수정
export const usePutAdminGroupInfo = ({
  groupName,
  groupDesc,
  groupImageServerUrl,
  isPublic,
  groupId,
}: AdminEditGroupInfoPropTypes) => {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isError } = useMutation({
    mutationKey: [QUERY_KEY_ADMIN.putAdminEditGroupInfo, groupId],
    mutationFn: () =>
      putAdminEditGroupInfo({ groupName, groupDesc, groupImageServerUrl, isPublic, groupId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_GROUPFEED.fetchHeaderGroup],
      });
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        if (err?.response?.status === 500) {
          alert('서버내부 오류입니다. ');
        } else if (err?.response?.status === 401) {
          alert('파일 형식을 확인해주세요');
        } else if (err?.response?.status === 413) {
          alert(`파일 형식을 확인해주세요 Error Code ${err.response.status}`);
        } else {
          alert(`${err?.response}`);
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
      //key에 대한 정책을 변경해야함, 현재는 key의 unique함은 보장되어있지만 관련성이 적어 key의 역할을 제대로 못하고있음
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_GROUPFEED.fetchHeaderGroup],
      });
      navigate('/');
    },
  });

  return { mutate, isError, isPending };
};
