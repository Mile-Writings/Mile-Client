import { allPostParsing } from './allPostParsing';

type GroupPostIdentifierTypes = {
  groupId: string;
  postId: string;
};

export const generateDynamicRoutes = async (apiURL: string) => {
  const dynamicRoutes: string[] = []; // 동적 경로 저장 배열

  const data: GroupPostIdentifierTypes[] = await allPostParsing(apiURL);

  data.map((items: GroupPostIdentifierTypes) => {
    dynamicRoutes.push(`/detail/${items.groupId}/${items.postId}`); // 동적경로 리스트
  });

  return dynamicRoutes;
};
