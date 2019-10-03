import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import middlewares from './middlewares';
import createReducerManager from './utils/createReducerManager.util';

const staticReducers = {
  user: state => ({ state }),
};

const initialState = {};

const configureStore = () => {
  const reducerManager = createReducerManager(staticReducers);

  const middlewareEnhancer = applyMiddleware(...middlewares);
  // Create a store with the root reducer function being the one exposed by the manager.
  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);
  const store = createStore(
    reducerManager.reduce,
    initialState,
    composedEnhancers
  );

  // Optional: Put the reducer manager on the store so it is easily accessible
  store.reducerManager = reducerManager;
  return store;
};

export default configureStore();
