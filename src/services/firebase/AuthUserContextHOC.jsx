import React, { useEffect, useState } from 'react';

import { withFirebase } from './index';

export const AuthUserContext = React.createContext(null);

const WithUserContextProvider = Component => {
  // create a component that can then be wrapped with withFirebase as it needs access to the props.firebase prop
  const useAuthUser = props => {
    const [authUser, setAuthUser] = useState(null);

    const onAuthChange = authUser => {
      if (authUser) {
        // fetch user from database and merge with the auth user entity
        props.firebase
          ._user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();
            authUser = { uid: authUser.uid, email: authUser.email, ...dbUser };
            setAuthUser(authUser);
          });
      }
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
  return withFirebase(useAuthUser);
};

export default WithUserContextProvider;
