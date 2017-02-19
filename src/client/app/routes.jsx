import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App.jsx';

export default (
  <Route path="/" component={App}>
    {
    /*<IndexRoute component={Home} />
    <Route path="somePath" component={SomeComponent} /> */
    }
  </Route>
)