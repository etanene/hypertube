import { all, fork } from 'redux-saga/effects';

import filmsSaga from './films/saga';

function* rootSaga() {
  yield all([
    fork(filmsSaga),
  ]);
}

export default rootSaga;
