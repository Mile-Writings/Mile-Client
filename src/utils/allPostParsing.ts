import getAllPost from './apis/getAllPost';

type postListInGroup = {
  [key: string]: string[];
};

interface PostListWithGroup {
  postListMoimMap: postListInGroup;
}
export const allPostParsing = async (url: string) => {
  const data = await getAllPost(url);

  const postListWithGroup: PostListWithGroup = data?.data?.data;

  const result = Object.entries(postListWithGroup.postListMoimMap).flatMap(
    ([groupId, postIds]: [string, string[]]) =>
      postIds.map((postId: string) => ({ groupId, postId })),
  );

  return result;
};
