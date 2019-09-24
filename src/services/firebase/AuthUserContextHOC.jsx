import React, { useEffect, useState } from 'react';

import { withFirebase } from './index';

export const AuthUserContext = React.createContext(null);

const withAuthUser = Component => {
  // create a component hook that can then be wrapped with withFirebase as it needs access to the props.firebase prop
  const useAuth = props => {
    const [authUser, setAuthUser] = useState(null);

    const onAuthChange = authUser => {
      setAuthUser(authUser);
    };

    // REFERENCE:  https://dev.to/bmcmahen/using-firebase-with-react-hooks-21ap
    useEffect(() => {
      // listen for auth state changes - async
      // on authStateChanged starts a listener and returns an unsubscribe object
      const endListener = props.firebase.auth.onAuthStateChanged(onAuthChange);

      // cleanup on unmount
      return () => endListener();
    }, []);

    return (
      <AuthUserContext.Provider value={authUser}>
        <Component {...props} />
      </AuthUserContext.Provider>
    );
  };

  // inject the firebase class into it so it can access firebase.auth and the listener
  return withFirebase(useAuth);
};

export default withAuthUser;
