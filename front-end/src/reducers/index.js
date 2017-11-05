import { combineReducers } from 'redux';
import search from './search';
import user from './user';
import actionFailed from './actionFailed';
import stuffs from './stuffs';

const app = combineReducers({
  search,
  user,
  actionFailed,
  stuffs,
});

export default app;
