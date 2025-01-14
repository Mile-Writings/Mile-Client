import fetchPostDetail from '../pages/postDetail/apis/fetchPostDetail';
const getPostDetailParsingMetatg = async (postId: string) => {
  const data = await fetchPostDetail(postId);

  const parsingData = {
    imageUrl: data?.data.imageUrl,
    title: data?.data.title,
  };
  return parsingData;
};

export default getPostDetailParsingMetatg;
