import React, { useContext, useEffect } from 'react';

import { AuthUserContext } from '.';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from './index';
import envs from '../../constants/envs';

/**
 * a HOC to wrap all protected routes.
 * Assumes that there is an existing Route component that renders the wrapped component so that Router props get passed in.
 * @params {Component} -a component that is wrapped and rendered by <Route /> so that router props are passed to it.
 * @returns a functional component that takes in router props and other passed in props and renders protected route or redirects to signin page
 */
const Protected = Component => {
  const ProtectedRoute = props => {
    const authUserContext = useContext(AuthUserContext);

    // need auth status to run the routing logic in onAuthChange
    useEffect(() => {
      console.log('deps test in protected')
      //  set up listener for firebase auth state, and receive auth state...
      const onAuthChange = authUser => {
        //  Redirection logic. if authUser exists then user is signed in..
        // (1) if no authUser then route to sign in page
        !authUser && props.history.push(ROUTES.SIGN_IN);
  
        // (2) if authUser, then...?
        if (authUser) {
          // if email not verified yet show the error page (only if not in dev mode)
          process.env.NODE_ENV !== envs.dev &&
            !authUser.emailVerified &&
            props.history.push(ROUTES.EMAIL_NOT_VERIFIED);
  
          // fetch user  data from db and create a composite user object
          // NOTE:  not needed for protected route.  used mainly in withUserHOC
          // props.firebase._updateUserState(authUser).then(user=>{ // do something})
  
          // else will show protected route...
        }
      };
      let endListener = props.firebase.auth.onAuthStateChanged(onAuthChange);

      // cleanup on unmount
      return () => {
        endListener();
      };
    }, [props.firebase.auth , props.history]);

    // return home page, or null if authed user not registered in <App /> context provider
    return authUserContext ? (
      <Component {...props} authUser={authUserContext} />
    ) : null;
  };

  // withFirebase needed to inject firebase.auth into this component
  return withFirebase(ProtectedRoute);
};

export default Protected;
