import React, { useEffect, useState } from 'react';

import { withFirebase } from './index';

export const AuthUserContext = React.createContext(null);

/**
 * Injects the authorised firebase user object into top level <App /> component via the context API.  Can be null value if not authed.
 * @param {Function} Component - this HOC is to wrap the top level <App /> component only.
 */
const WithUserContextProvider = Component => {
  // create a component that can then be wrapped with withFirebase as it needs access to the props.firebase prop
  const useAuthUser = props => {
    const [authUser, setAuthUser] = useState(
      JSON.parse(localStorage.getItem('authUser'))
    ); // null if signed out.  if signed in, prevents reload flicker

    // REFERENCE:  https://dev.to/bmcmahen/using-firebase-with-react-hooks-21ap
    useEffect(() => {
      console.log('deps test authUserContextHOC');

      // listen for auth state changes - async
      const onAuthChange = authUser => {
        if (authUser) {
          props.firebase._updateUserState(authUser).then(user => {
            setAuthUser(user);
            localStorage.setItem('authUser', JSON.stringify(user));
          });
        } else {
          setAuthUser(null);
          localStorage.removeItem('authUser');
        }
      };
      // on authStateChanged starts a listener and returns an unsubscribe object
      const endListener = props.firebase.auth.onAuthStateChanged(onAuthChange);

      // cleanup on unmount
      return () => endListener();
    }, [props.firebase]);

    return (
      <AuthUserContext.Provider value={authUser}>
        <Component {...props} />
      </AuthUserContext.Provider>
    );
  };

  // inject the firebase class into it so it can access firebase.auth and the listener
  return withFirebase(useAuthUser);
};

export default WithUserContextProvider;
