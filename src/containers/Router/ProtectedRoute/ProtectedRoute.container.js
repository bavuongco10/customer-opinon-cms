import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from '@reach/router';

import PublicRoute from '../PublicRoute/PublicRoute.container';
import PrivateLayout from '../PrivateLayout/PrivateLayout.container';

const ProtectedRoute = props => {
  const isAuth = useSelector(state => state?.user?.isAuthenticated);
  if (true)
    return (
      <PrivateLayout>
        <PublicRoute {...props} />
      </PrivateLayout>
    );

  return <Redirect to="/sign-in" noThrow />;
};

export default ProtectedRoute;
