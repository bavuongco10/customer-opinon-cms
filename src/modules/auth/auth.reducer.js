import { createAction } from 'redux-actions';
import typeToReducer from 'type-to-reducer';
import actionTyper from 'redux-actiontyper';
import axios from 'axios';

import { store } from '../../redux/store.redux';
import { API_HOST } from '../../constants/main.constants';

const { SIGN_UP, SIGN_IN } = actionTyper('users/');

const signUpAction = createAction(SIGN_UP, values =>
  axios.put(`${API_HOST}/auth/signup`, values)
);

const signInAction = createAction(SIGN_IN, values =>
  axios.post(`${API_HOST}/auth/login`, values)
);

const signInActionCreator = () => async dispatch => {
  const result = await dispatch(signInAction);
  console.log(result);
};

const signUpActionCreator = (...params) => async dispatch => {
  const result = await dispatch(signUpAction(...params));
  console.log(result);
};

const initialState = {
  userId: null,
  isAuthenticated: false,
  role: null,
};

export const actions = {
  signInAction,
  signUpAction,
  signInActionCreator,
  signUpActionCreator,
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

store.reducerManager.add('user', reducer);
