// 임시저장 된 글 있는지 여부 확인 api 데이터
// 글 작성 페이지 들어가자마자 렌더링 됨
// data.data
interface temporaryDataPropTypes {
  isTemporaryPostExist: boolean;
  postId: number;
}

// 임시저장 있을 경우
export const TEMPORARY_SAVE_EXIST_DUMMY_DATA: temporaryDataPropTypes = {
  isTemporaryPostExist: true,
  postId: 2,
};
