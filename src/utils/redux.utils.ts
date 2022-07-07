import store from 'store/store';
import { TEST_ACTION, GET_USER, COIN_LIST } from './types.utils';

export const testDispatch = (payload: object) =>
  store.dispatch({
    type: TEST_ACTION,
    payload: payload,
  });

export const setUser = (payload: object) => {
  store.dispatch({
    type: GET_USER,
    payload: payload,
  });
};

export const setCoinList = (payload: object) => {
  store.dispatch({
    type: COIN_LIST,
    payload: payload,
  });
};
