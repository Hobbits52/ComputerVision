import React from 'react';
import { Route, IndexRoute } from 'react-router';

// components
import App from './App.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Dashboard from './Dashboard.jsx';
import HomeView from './HomeView.jsx';
import StudentsView from './StudentsView.jsx';
import ClassesView from './ClassesView.jsx';
import KeysView from './KeysView.jsx';
import StatisticsView from './StatisticsView.jsx';
import LandingPage from './LandingPage.jsx';
import TemplatesView from './TemplatesView.jsx'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage} />
    <Route path="login" component={Login} />
    <Route path="signup" component={Signup} />
    <Route path="dashboard" component={Dashboard} >
      <IndexRoute component={HomeView} />
      <Route path="students" component={StudentsView} />
      <Route path="classes" component={ClassesView} />
      <Route path="keys" component={KeysView} />
      <Route path="templates" component={TemplatesView} />
      <Route path="statistics" component={StatisticsView} />
    </Route>
  </Route>
);