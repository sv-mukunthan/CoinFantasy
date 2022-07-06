import { combineReducers } from 'redux';
import testReducer from 'store/reducers/test.reducer';
import chatReducer from 'store/reducers/chat.reducer';
import userReducer from 'store/reducers/user.reducer';

export default combineReducers({
  test: testReducer,
  chat: chatReducer,
  user: userReducer
});
