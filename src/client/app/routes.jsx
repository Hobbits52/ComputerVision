import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import TeacherViewContainer from './TeacherViewContainer.jsx';
import HomeView from './HomeView.jsx';
import StudentsView from './StudentsView.jsx';
import ClassesView from './ClassesView.jsx';
import KeysView from './KeysView.jsx';
import StatisticsView from './StatisticsView.jsx';

import TestResultsContainer from './TestResultsContainer.jsx';
import TestResults from './TestResults.jsx';
import TestTakerResults from './TestTakerResults.jsx';
// Need to add a route for the above!

export default (
  <Route path="/" component={App}>
    <IndexRoute component={TeacherViewContainer} />
      <IndexRoute component={HomeView} />
      <Route path="/" component={HomeView} />
      <Route path="students" component={StudentsView} />
      <Route path="classes" component={ClassesView} />
      <Route path="keys" component={KeysView} />
      <Route path="statistics" component={StatisticsView} />

  </Route>
)

// export default (
//   <Route path="/" component={App}>
//     <IndexRoute component={Login} />
//     <Route path="signup" component={Signup} />
//     <Route path="testresults" component={TestResultsContainer}>
//       <IndexRoute component={TestResults} />
//       <Route path=":testTaker" component={TestTakerResults} />
//     </Route>
//   </Route>
// )
// 
//       <IndexRoute component={TestResults} />
      // <Route path=":testTaker" component={TestTakerResults} />