const commentsReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      return [
        ...state,
        action.comment,
      ];
    default:
      return state;
  }
};

export default commentsReducer;
