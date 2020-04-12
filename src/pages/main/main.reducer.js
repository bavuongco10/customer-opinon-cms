import { createAction } from 'redux-actions';
import typeToReducer from 'type-to-reducer';
import actionTyper from 'redux-actiontyper';
import axios from 'axios';

import { store } from '../../redux/store.redux';
import { API_HOST } from '../../constants/main.constants';

const {
  SEARCH_CITIES,
  GET_TRAVEL_TYPES,
  GET_RANKINGS,
  CLEAN_UP,
  GET_INITIAL_RANKING,
} = actionTyper('main/');

const searchCitiesAction = createAction(SEARCH_CITIES, values =>
  axios.get(`${API_HOST}/api/search/cities`, { params: values })
);

const getTravelTypesAction = createAction(GET_TRAVEL_TYPES, () =>
  axios.get(`${API_HOST}/api/travels`)
);

const getRankingsAction = createAction(GET_RANKINGS, values =>
  axios.get(`${API_HOST}/api/rankings`, { params: values })
);

const getInitialRankingsAction = createAction(GET_INITIAL_RANKING, values =>
  axios.get(`${API_HOST}/api/initial-rankings`, { params: values })
);

const cleanUpAction = createAction(CLEAN_UP);

const initialState = {
  cities: [],
  travelTypes: [],
  rankings: [],
};

export const actions = {
  searchCitiesAction,
  getTravelTypesAction,
  getRankingsAction,
  cleanUpAction,
  getInitialRankingsAction,
};

const reducer = typeToReducer(
  {
    [SEARCH_CITIES]: {
      FULFILLED: (state, action) => ({
        ...state,
        cities: action.payload?.data?.items,
      }),
    },
    [GET_TRAVEL_TYPES]: {
      FULFILLED: (state, action) => ({
        ...state,
        travelTypes: action.payload?.data?.items,
      }),
    },
    [GET_RANKINGS]: {
      FULFILLED: (state, action) => ({
        ...state,
        rankings: action.payload?.data?.items,
      }),
    },
    [GET_INITIAL_RANKING]: {
      FULFILLED: (state, action) => ({
        ...state,
        rankings: action.payload?.data?.items,
      }),
    },
    [CLEAN_UP]: () => initialState,
  },
  initialState
);

store.reducerManager.add('main', reducer);
