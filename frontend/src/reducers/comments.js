const commentsReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      return [
        ...state,
        action.comment,
      ];
    case 'LOAD_COMMENTS':
      return [
        ...action.comments,
      ];
    default:
      return state;
  }
};

export default commentsReducer;
