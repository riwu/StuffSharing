import React from 'react';
import { Route } from 'react-router-dom';
import User from './User';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import Navigation from './NavigationContainer';
import FAQ from './FAQ';
import './App.css';

const App = () => (
  <div className="App">
    <div className="navigationBar">
      <Navigation />
    </div>
    <Route exact path="/" component={HomePage} />
    <Route path="/users/:username" component={User} />
    <Route path="/login" component={LoginPage} />
    <Route path="/FAQ" component={FAQ} />
  </div>
);

export default App;
