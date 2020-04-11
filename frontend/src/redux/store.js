import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const middlewareEnhancer = applyMiddleware(...middlewares);

const enhancers = [middlewareEnhancer];
const composedEnhancer = compose(...enhancers);

const store = createStore(rootReducer, undefined, composedEnhancer);

sagaMiddleware.run(rootSaga);

export default store;
