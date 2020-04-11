import { combineReducers } from 'redux';

import filmsReducer from './films/reducer';

const rootReducer = combineReducers({
  films: filmsReducer,
});

export default rootReducer;
