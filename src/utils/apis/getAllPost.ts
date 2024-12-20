import axios from 'axios';
const getAllPost = async (url: string) => {
  const data = await axios.get(`${url}/api/internal/post-data`);

  return data;
};

export default getAllPost;
