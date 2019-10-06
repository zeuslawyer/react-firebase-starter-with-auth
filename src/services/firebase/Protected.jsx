import React, { useContext, useEffect } from 'react';
import { AuthUserContext } from '.';
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
      //  set up listener for firebase auth state, and receive auth state...
      let endListener = props.firebase.auth.onAuthStateChanged(authUser => {
        //  Redirection logic

        // (1) if no authUser then route to sign in page
        !authUser && props.history.push(ROUTES.SIGN_IN);

        // (2) if authUser, then
        if (authUser) {
          // fetch user  data from db
          props.firebase
            ._user(authUser.uid)
            .once('value')
            .then(snapshot => {
              const dbUser = snapshot.val();
              // merge the authUser and dbUser objects
              authUser = {
                uid: authUser.uid,
                email: authUser.email,
                ...dbUser
              };

            });
        }
      });

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
