const commentsReducer = (state, action) => {
  let maxId = 1;
  const { comment } = action;
  switch (action.type) {
    case 'ADD_COMMENT':
      state.forEach((com) => { if (com.id > maxId) maxId = com.id; });
      comment.id = maxId + 1;
      return [
        ...state,
        action.comment,
      ];
    default:
      return state;
  }
};

export default commentsReducer;
