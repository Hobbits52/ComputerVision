import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

import TestResults from './TestResults.jsx';
// Need to add a route for the above!

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Login} />
    <Route path="signup" component={Signup} />
  </Route>
)