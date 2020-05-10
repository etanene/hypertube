const queryReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_QUERY':
      return {
        ...state,
        ...action.query,
      };
    case 'REPLACE_QUERY':
      return {
        ...action.query,
      };
    default:
      return state;
  }
};

export default queryReducer;
