import { combineReducers } from 'redux';
import testReducer from 'store/reducers/test.reducer';
import userReducer from 'store/reducers/user.reducer';
import CoinReducer from './coins.reducer';

export default combineReducers({
  test: testReducer,
  user: userReducer,
  coin: CoinReducer,
});
