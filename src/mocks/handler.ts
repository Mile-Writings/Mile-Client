import { http, HttpResponse } from 'msw';
export const handlers = [
  http.get('/api/moim/moimId/topicList', ({ request }) => {
    const url = new URL(request.url);
    // const moimId = params.moimId;
    const page = url.searchParams.get('page');
    console.log(page, 'page'); //빌드용
    return HttpResponse.json({
      topicCount: 35,
      topics: [
        {
          topicId: 'MQ==',
          topicName: '글감 제목1',
          topicTag: '글감 태그1',
          topicDescription: '글감 설명',
          createdAt: '2024-03-22',
        },
        {
          topicId: 'MZ==',
          topicName: '글감 제목2',
          topicTag: '글감 태그2',
          topicDescription:
            '안녕나는서채원이야.안녕나는서채원이야.안녕나는서채원이야.안녕나는서채원이야.안녕나는서채원이야.안녕나는서채원이야.안녕나는서채원이야',
          createdAt: '2024-03-23',
        },
        {
          topicId: 'ML==',
          topicName: '글감 제목3',
          topicTag: '글감 태그3',
          topicDescription: '글감 설명',
          createdAt: '2024-03-29',
        },
        {
          topicId: 'MP==',
          topicName: '글감 제목4',
          topicTag: '글감 태그4',
          topicDescription: '글감 설명',
          createdAt: '2024-03-10',
        },
      ],
    });
  }),
  http.post('/api/moim/moimId/topic', () => {
    return HttpResponse.json({ status: 201, message: '글감 생성이 완료되었습니다.' });
  }),
  http.put('/api/topic/topicId', () => {
    return HttpResponse.json({ status: 200, message: '글감 수정이 완료되었습니다.' });
  }),
  http.get('/api/moim/:moimId/authenticate', () => {
    return HttpResponse.json({
      status: 200,
      data: {
        isMember: false,
        isOwner: false,
      },
    });
  }),
  http.get('/api/moim/:moimId/public-status', () => {
    return HttpResponse.json({
      status: 200,
      data: {
        isPublic: false,
      },
      message: '공개/비공개 확인',
    });
  }),
  http.post('https://dev.milewriting.com/api/post/:postId/curious', () => {
    console.log('mocking 완료');
    return HttpResponse.json({
      status: 403,
      message: '접근권한없음',
      data: {
        message: "'궁금해요'는 이미 존재합니다.",
        status: 40306,
      },
    });
  }),
  http.delete('https://dev.milewriting.com/api/post/:postId/curious', async () => {
    console.log('삭제 mocking 완료');
    return HttpResponse.json({
      status: 500,
      message: '접근권한없음',
    });
  }),
];
