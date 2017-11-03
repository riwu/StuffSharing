import { combineReducers } from 'redux';
import users from './users';
import stuffs from './stuffs';
import loans from './loans';
import bids from './bids';
import search from './search';
import user from './user';
import actionFailed from './actionFailed';

const app = combineReducers({
  users,
  stuffs,
  loans,
  bids,
  search,
  user,
  actionFailed,
});

export default app;
