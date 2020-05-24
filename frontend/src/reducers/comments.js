const COMMENT_ADD = 'COMMENT_ADD';
export function addComment(comment) {
  return {
    type: COMMENT_ADD,
    payload: comment,
  };
}

const COMMENT_SET = 'COMMENT_SET';
export function setComments(comments) {
  return {
    type: COMMENT_SET,
    payload: comments,
  };
}

const commentsReducer = (state, action) => {
  switch (action.type) {
    case COMMENT_ADD:
      return [
        ...state,
        action.payload,
      ];
    case COMMENT_SET:
      return action.payload;
    default:
      return state;
  }
};

export default commentsReducer;
