import { client } from "../../../utils/apis/axios";
const postDirectlyS3 = (url:string) => {

try{
  const data=client.post(`/${url}`,{},{
    headers:{
      "Content-Type":"multipart/form-data"
    }
  })
}
};

export default postDirectlyS3;
