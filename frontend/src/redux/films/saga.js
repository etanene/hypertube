import {
  all,
  fork,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import apiService from '../../services/apiService';

import filmsAction from './action';

function* getFilms(action) {
  const { payload } = action;
  try {
    const films = yield call(apiService.get, '/films', payload);
    yield put(filmsAction.saveFilms(films));
  } catch (error) {
    console.log('Error: ', error);
  }
}

function* watchGetFilms() {
  yield takeLatest(filmsAction.GET_FILMS, getFilms);
}

function* filmsSaga() {
  yield all([
    fork(watchGetFilms),
  ]);
}

export default filmsSaga;
