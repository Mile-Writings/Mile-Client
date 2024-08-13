import { authClient } from './../../../utils/apis/axios';

export interface InvitationPropTypes {
  status: number;
  message: string;
  data: invitationData;
}

export interface invitationData {
  invitationCode: string;
}

export const fetchInvitationLink = async (groupId: string) => {
  try {
    const { data } = await authClient.get<InvitationPropTypes>(
      `/api/moim/${groupId}/invitation-code`,
    );
    return { data: { data }.data.data };
  } catch {
    console.error();
  }
};
