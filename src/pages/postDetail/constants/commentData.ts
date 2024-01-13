interface commentDataTypes {
  commentId: number;
  name: string;
  moimName: string;
  content: string;
  isMyComment: boolean;
}
export const commentData: commentDataTypes[] = [
  {
    commentId: 1,
    name: '작자미상1',
    moimName: '짜미들',
    content: '댓글 내용',
    isMyComment: false,
  },
  {
    commentId: 2,
    name: '작자미상2',
    moimName: '짜미들',
    content: '댓글 내용',
    isMyComment: false,
  },
  {
    commentId: 3,
    name: '글쓴이',
    moimName: '짜미들',
    content: '댓글 내용',
    isMyComment: true,
  },
];
