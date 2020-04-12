import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import middlewares from './middlewares';
import createReducerManager from './utils/createReducerManager.util';

const staticReducers = {};

const initialState = {};

const persistConfig = {
  key: 'root',
  storage,
};

const reducerManager = createReducerManager(staticReducers);

const persistedReducer = persistReducer(persistConfig, reducerManager.reduce);

const configureStore = () => {
  const middlewareEnhancer = applyMiddleware(...middlewares);
  // Create a store with the root reducer function being the one exposed by the manager.
  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);
  const currentStore = createStore(
    persistedReducer,
    initialState,
    composedEnhancers
  );

  // Optional: Put the reducer manager on the store so it is easily accessible
  currentStore.reducerManager = reducerManager;
  return currentStore;
};

export const store = configureStore();
export const persistor = persistStore(store);
