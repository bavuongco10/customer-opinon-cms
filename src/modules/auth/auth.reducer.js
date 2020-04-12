import { createAction } from 'redux-actions';
import typeToReducer from 'type-to-reducer';
import actionTyper from 'redux-actiontyper';
import axios from 'axios';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import { store } from '../../redux/store.redux';
import { API_HOST } from '../../constants/main.constants';

const { SIGN_UP, SIGN_IN } = actionTyper('users/');

const signUpAction = createAction(SIGN_UP, values =>
  axios.put(`${API_HOST}/auth/signup`, values)
);

const signInAction = createAction(SIGN_IN, values =>
  axios.post(`${API_HOST}/auth/login`, values)
);

const initialState = {
  userId: null,
  isAuthenticated: false,
  role: null,
};

export const actions = {
  signInAction,
  signUpAction,
};

const reducer = typeToReducer(
  {
    [SIGN_UP]: {
      FULFILLED: (state, action) => ({
        ...state,
        ...action.payload.data,
        isAuthenticated: true,
      }),
    },
    [SIGN_IN]: {
      FULFILLED: (state, action) => ({
        ...state,
        ...action.payload.data,
        isAuthenticated: true,
      }),
    },
  },
  initialState
);

const authPersistConfig = {
  key: 'user',
  storage,
};

store.reducerManager.add('user', persistReducer(authPersistConfig, reducer));
