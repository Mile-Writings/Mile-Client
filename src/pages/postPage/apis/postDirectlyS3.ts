import axios from 'axios';

const postDirectlyS3 = async (url: string, imageFile: File) => {
  try {
    await axios.put(`${url}`, imageFile, {
      headers: {
        // 'Content-Type': 'application/octet-stream',
        'Content-Type': 'image/jpeg',
        //'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export default postDirectlyS3;
