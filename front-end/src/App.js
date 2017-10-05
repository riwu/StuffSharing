import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { Route } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import MainApp from './components/App';
import User from './components/User';
import reducer from './reducers';
import { getUsers, getBids, getLoans, getStuffs } from './actions';

const history = createHistory();
const middleware = [thunk, routerMiddleware(history)];

const store = createStore(reducer, applyMiddleware(...middleware));
store.dispatch(getUsers);
store.dispatch(getBids);
store.dispatch(getLoans);
store.dispatch(getStuffs);

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" component={MainApp} />
          <Route path="/users/:username" component={User} />
        </div>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
