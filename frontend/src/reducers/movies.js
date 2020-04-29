const moviesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MOVIES':
      return [
        ...state,
        ...action.movies,
      ];
    case 'REPLACE_MOVIES':
      return [
        ...action.movies,
      ];
    case 'REMOVE_MOVIES':
      return [];
    default:
      return state;
  }
};

export default moviesReducer;
