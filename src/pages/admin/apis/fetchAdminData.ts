import axios from 'axios';

export const fetchAdminTopic = async () => {
  try {
    const response = await fetch('/api/moim/moimId/topicList?page=1');
    const data = await response.json();
    console.log(data, 'res');

    return data;
  } catch (error) {
    console.log('에러:', error);
  }
  // try {
  //   fetch('/api/moim/moimId/topicList?page=1')
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return res.json();
  //     })
  //     .then((data) => console.log(data));
  // } catch (error) {
  //   console.error('Error:', error);
  // }
};

// interface AdminTopicPropTypes {
//   data: {
//     topicCount: number;
//     topics: {
//       topicId: string;
//       topicName: string;
//       topicTag: string;
//       topicDescripton: string;
//       createdAt: string;
//     }[];
//   };
//   status: number;
//   message: string;
// }
