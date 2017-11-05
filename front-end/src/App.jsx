import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import storage from 'redux-persist/lib/storage';

import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import MainApp from './components/App';
import reducer from './reducers';

const history = createHistory();
const middleware = [thunk, routerMiddleware(history)];

const config = {
  key: 'root',
  version: 1,
  blacklist: ['actionFailed'],
  storage,
};
const persistedReducer = persistReducer(config, reducer);
const store = createStore(persistedReducer, applyMiddleware(...middleware));
const persistor = persistStore(store);


function App() {
  return (
    <Provider store={store}>
      <PersistGate
        persistor={persistor}
      >
        <ConnectedRouter history={history}>
          <MainApp />
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
