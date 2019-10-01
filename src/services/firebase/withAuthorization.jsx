import React, { useContext, useEffect } from 'react';
import { AuthUserContext } from './';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from './index';

/**
 * a HOC to wrap all protected routes.
 * Assumes that there is an existing Route component that renders the wrapped component so that Router props get passed in.
 * @returns a functional component that takes in router props and other passed in props and renders protected route or redirects to signin page
 */
const Protected = Component => {
  const ProtectedRoute = props => {
    const context = useContext(AuthUserContext);

    useEffect(() => {
      // if no authUser then route to sign in page
      let endListener = props.firebase.auth.onAuthStateChanged(authUser => {
        !authUser && props.history.push(ROUTES.SIGN_IN);
      });

      // cleanup on unmount
      return () => {
        endListener();
      };
    });

    // return home page, or null if authed user not registered in <App /> context provider
    return context ? <Component {...props} authUser={context} /> : null;
  };

  // withFirebase needed to inject firebase.auth into this component
  return withFirebase(ProtectedRoute);
};

export default Protected;
