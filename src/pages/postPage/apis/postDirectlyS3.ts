import axios from 'axios';

const postDirectlyS3 = async (url: string, fileName: string) => {
  try {
    const data = await axios.put(
      `${url}`,
      { fileName },
      {
        headers: {
          'Content-Type': 'application/octet-stream',
          // 'Content-Type': 'image/jpg',
          'Access-Control-Allow-Origin': '*',
        },
      },
    );
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default postDirectlyS3;
