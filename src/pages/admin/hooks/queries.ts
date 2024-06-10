import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  editAdminTopic,
  fetchAdminTopic,
  postAdminTopic,
  postAdminTopicPropTypes,
  deleteAdminTopic,
} from '../apis/fetchAdminData';
import fetchAdminGroupInfo from '../apis/fetchAdminGroupInfo';
import fetchDeleteMember from '../apis/fetchDeleteMember';
import { fetchInvitationLink } from '../apis/fetchInvitationLink';
import fetchMemberInfo from '../apis/fetchMemberInfo';

export const QUERY_KEY_ADMIN = {
  useMemberInfo: 'fetchMemberInfo',
  fetchInvitationLink: 'fetchInvitationLink',
  fetchAdminGroupInfo: 'fetchAdminGroupInfo',
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

//모임 정보 수정 get

export const useFetchGroupInfo = (groupId: string) => {
  const data = useQuery({
    queryKey: [QUERY_KEY_ADMIN.fetchAdminGroupInfo, groupId],
    queryFn: () => fetchAdminGroupInfo(groupId),
  });
  console.log(data);
  return data;
};
