/**
 * To add a new reducer, one can now call store.reducerManager.add("asyncState", asyncReducer).
 * To remove a reducer, one can now call store.reducerManager.remove("asyncState")
 */

import { omit, includes, isEmpty } from 'lodash';
import { combineReducers } from 'redux';

const createReducerManager = initialReducers => {
  // eslint-disable-next-line no-underscore-dangle
  const __RESET__ = '__RESET__';
  // Create an object which maps keys to reducers
  const reducers = { ...initialReducers };

  // Create the initial combinedReducer
  let combinedReducer = combineReducers(reducers);

  // An array which is used to delete state keys when reducers are removed
  let keysToRemove = [];

  return {
    getReducerMap: () => reducers,

    // The root reducer function exposed by this object
    // This will be passed to the store
    reduce: (state, action) => {
      // If any reducers have been removed, clean up their state first
      if (!isEmpty(keysToRemove)) {
        if (includes(keysToRemove, __RESET__)) {
          // eslint-disable-next-line no-param-reassign
          state = {};
        } else {
          // eslint-disable-next-line no-param-reassign
          state = omit(state, keysToRemove);
        }
        keysToRemove = [];
      }

      // Delegate to the combined reducer
      return combinedReducer(state, action);
    },

    // Adds a new reducer with the specified key
    add: (key, reducer) => {
      if (!key || reducers[key]) {
        return;
      }

      // Add the reducer to the reducer mapping
      reducers[key] = reducer;

      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers);
    },

    // Removes a reducer with the specified key
    remove: key => {
      // eslint-disable-next-line no-console
      if (!key || !reducers[key]) return;

      // Remove it from the reducer mapping
      delete reducers[key];

      // Add the key to the list of keys to clean up
      keysToRemove.push(key);

      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers);
    },
    reset: () => {
      // Add the key to the list of keys to clean up

      keysToRemove.push(__RESET__);
      // Generate a new combined reducer
      combinedReducer = combineReducers(null);
    },
  };
};

export default createReducerManager;
