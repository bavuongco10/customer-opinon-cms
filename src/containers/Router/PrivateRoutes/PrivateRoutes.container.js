import React from 'react';
import { Redirect, Router } from '@reach/router';

import Dashboard from '../../../pages/dashboard/Dashboard.page';
import Source from '../../../pages/source/Source.page';
import Analyze from '../../../pages/analyze/Analyze.page';

const PrivateRoutes = () => (
  <Router>
    <Dashboard path="dashboard" />
    <Source path="source" />
    <Analyze path="analyze" />
    <Redirect default noThrow from="/" to="/dashboard" />
  </Router>
);

export default PrivateRoutes;
