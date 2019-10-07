import React, { useContext, useEffect } from 'react';
import { AuthUserContext } from '.';
import * as ROUTES from '../../constants/routes';

import { withFirebase } from './index';

/**
 * a HOC to wrap all protected routes.
 * Assumes that there is an existing Route component that renders the wrapped component so that Router props get passed in.
 * @params {Component} -a component that is wrapped and rendered by <Route /> so that router props are passed to it.
 * @returns a functional component that takes in router props and other passed in props and renders protected route or redirects to signin page
 */
const Protected = Component => {
  const ProtectedRoute = props => {
    const context = useContext(AuthUserContext);
    const onAuthChange = authUser => {
      //  Redirection logic
      // (1) if no authUser then route to sign in page
      !authUser && props.history.push(ROUTES.SIGN_IN);

      // (2) if authUser, then...?  will show protected routee...
      if (authUser) {
        // fetch user  data from db
        //NOTE:  not needed?
        // props.firebase._updateUserState(authUser)
      }
    };

      // need auth status to run the routing logic in onAuthChange
    useEffect(() => {
      //  set up listener for firebase auth state, and receive auth state...
      let endListener = props.firebase.auth.onAuthStateChanged(onAuthChange);

      // cleanup on unmount
      return () => {
        endListener();
      };
    }, []);

    // return home page, or null if authed user not registered in <App /> context provider
    return context ? <Component {...props} authUser={context} /> : null;
  };

  // withFirebase needed to inject firebase.auth into this component
  return withFirebase(ProtectedRoute);
};

export default Protected;
