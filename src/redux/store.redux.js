import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import middlewares from './middlewares';
import createReducerManager from './utils/createReducerManager.util';

const staticReducers = {};

const initialState = {};

const reducerManager = createReducerManager(staticReducers);

const configureStore = () => {
  const middlewareEnhancer = applyMiddleware(...middlewares);
  // Create a store with the root reducer function being the one exposed by the manager.
  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);
  const currentStore = createStore(
    reducerManager.reduce,
    initialState,
    composedEnhancers
  );

  // Optional: Put the reducer manager on the store so it is easily accessible
  currentStore.reducerManager = reducerManager;
  return currentStore;
};

export const store = configureStore();
