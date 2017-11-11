import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import search from './search';
import user from './user';
import actionFailed from './actionFailed';
import stuffs from './stuffs';
import newVisit from './newVisit';

const app = combineReducers({
  search,
  user,
  actionFailed,
  stuffs,
  route: routerReducer,
  newVisit,
});

export default app;
