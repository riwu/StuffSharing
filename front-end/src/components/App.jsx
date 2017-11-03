import React from 'react';
import { Route } from 'react-router-dom';
import User from './User';
import Stuffs from './Stuffs';
import LoginPage from './LoginPage';

const App = () => (
  <div>
    <h1>This is a stuff sharing website for CS2102</h1>
    <Route exact path="/" component={Stuffs} />
    <Route path="/users/:username" component={User} />
    <Route path="/login" component={LoginPage} />
  </div>
);

export default App;
