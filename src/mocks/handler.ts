import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/moim/moimId/topicList', ({ request }) => {
    const url = new URL(request.url);
    // const moimId = params.moimId;
    const page = url.searchParams.get('page');
    return HttpResponse.json([
      {
        topicCount: 4,
        topics: [
          {
            topicId: 'MQ==',
            topicName: '글감 제목1',
            topicTag: '글감 태그',
            topicDescripton: '글감 설명',
            createdAt: '2024-03-22',
          },
          {
            topicId: 'MZ==',
            topicName: '글감 제목2',
            topicTag: '글감 태그',
            topicDescripton:
              '안녕나는서채원이야.안녕나는서채원이야.안녕나는서채원이야.안녕나는서채원이야.안녕나는서채원이야.안녕나는서채원이야.안녕나는서채원이야',
            createdAt: '2024-03-23',
          },
          {
            topicId: 'ML==',
            topicName: '글감 제목3',
            topicTag: '글감 태그',
            topicDescripton: '글감 설명',
            createdAt: '2024-03-29',
          },
          {
            topicId: 'MP==',
            topicName: '글감 제목4',
            topicTag: '글감 태그',
            topicDescripton: '글감 설명',
            createdAt: '2024-03-10',
          },
        ],
      },
    ]);
  }),
];
