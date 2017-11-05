import React from 'react';
import { Route } from 'react-router-dom';
import User from './User';
import Stuffs from './Stuffs';
import LoginPage from './LoginPage';
import Navigation from './NavigationContainer';
import './App.css';

const App = () => (
  <div className="App">
    <div className="navigationBar">
      <Navigation />
    </div>
    <Route exact path="/" component={Stuffs} />
    <Route path="/users/:username" component={User} />
    <Route path="/login" component={LoginPage} />
  </div>
);

export default App;
