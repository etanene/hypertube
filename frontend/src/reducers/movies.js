const moviesReducer = (state, action) => {
  const dup = {};
  switch (action.type) {
    case 'ADD_MOVIES':
      return [...state, ...action.movies].filter((item) => {
        if (!dup[item.id]) {
          dup[item.id] = true;
          return true;
        }
        return false;
      });
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
