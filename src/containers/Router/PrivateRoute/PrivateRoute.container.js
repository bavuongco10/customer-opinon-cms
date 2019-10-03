import React from 'react';
import { Redirect } from '@reach/router';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  if (isAuthenticated) return <Component {...rest} />;
  return <Redirect to="login" />;
};

export default PrivateRoute;
