import React from 'react';
import { Router } from '@reach/router';

import PublicRoute from './PublicRoute/PublicRoute.container';
import PrivateLayout from './PrivateLayout/PrivateLayout.container';
import PrivateRoutes from './PrivateRoutes/PrivateRoutes.container';

const PrivateRoutesWithLayout = () => (
  <PrivateLayout>
    <PrivateRoutes />
  </PrivateLayout>
);

const RootRouter = () => (
  <Router>
    <PublicRoute path="/" default component={PrivateRoutesWithLayout} />
  </Router>
);

export default RootRouter;
