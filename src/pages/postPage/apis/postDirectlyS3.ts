import axios from 'axios';

const postDirectlyS3 = async (url: string, imageFile: File) => {
  try {
    const data = await axios.put(`${url}`, imageFile, {
      headers: {
        // 'Content-Type': 'application/octet-stream',
        'Content-Type': 'image/jpeg',
        //'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
    });
    console.log(imageFile);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default postDirectlyS3;
