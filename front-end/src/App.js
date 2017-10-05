import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import MainApp from './components/App';
import reducer from './reducers';
import { getUsers, getBids, getLoans, getStuffs } from './actions';

const middleware = [thunk];

const store = createStore(reducer, applyMiddleware(...middleware));
store.dispatch(getUsers);
store.dispatch(getBids);
store.dispatch(getLoans);
store.dispatch(getStuffs);

function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}

export default App;
