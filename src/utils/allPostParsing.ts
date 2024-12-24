import getAllPost from './apis/getAllPost';

type postListMoimMap = {
  [key: string]: string[]; // key는 문자열, 값은 문자열 배열
};

interface PostListWithGroup {
  postListMoimMap: postListMoimMap;
}
export const allPostParsing = async (url: string) => {
  const data = await getAllPost(url);

  const postListWithGroup: PostListWithGroup = data?.data?.data;

  const result = Object.entries(postListWithGroup.postListMoimMap).flatMap(
    ([key, values]: [string, string[]]) => values.map((value: string) => ({ key, value })),
  );

  return result;
};
