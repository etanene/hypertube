import filmsAction from './action';

const initialState = {
  data: [],
};

function filmsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case filmsAction.SAVE_FILMS:
      return {
        ...state,
        data: payload,
      };
    default:
      return state;
  }
}

export default filmsReducer;
