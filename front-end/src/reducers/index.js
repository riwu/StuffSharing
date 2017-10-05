import { combineReducers } from 'redux';
import users from './users';
import stuffs from './stuffs';
import loans from './loans';
import bids from './bids';

const app = combineReducers({
  users,
  stuffs,
  loans,
  bids,
});

export default app;
