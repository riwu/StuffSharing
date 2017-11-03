import { combineReducers } from 'redux';
import users from './users';
import stuffs from './stuffs';
import loans from './loans';
import bids from './bids';
import search from './search';

const app = combineReducers({
  users,
  stuffs,
  loans,
  bids,
  search,
});

export default app;
