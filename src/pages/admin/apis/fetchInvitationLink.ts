import { devClient } from './../../../utils/apis/axios';

export interface InvitationPropTypes {
  status: number;
  message: string;
  data: invitationData;
}

export interface invitationData {
  data: {
    invitationCode: string;
  };
}

export const fetchInvitationLink = async (groupId: string) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const { data } = await devClient.get<InvitationPropTypes>(
      `/api/moim/${groupId}/invitation-code`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log({ data }.data.data);
    return { data: { data }.data.data };
  } catch {
    console.error();
  }
};
