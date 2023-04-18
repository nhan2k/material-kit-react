import React from 'react';
import { RequireAuth } from 'react-auth-kit';

function requireAuth(Component) {
  return function AuthenticatedComponent(props) {
    return (
      <RequireAuth loginPath={'/login'}>
        <Component {...props} />
      </RequireAuth>
    );
  };
}

export default requireAuth;
