import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Leaderboard from '../pages/Leaderboard';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/leaderboard" component={Leaderboard} />
  </Switch>
);

export default Routes;
