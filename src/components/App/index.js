import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import Landing from '../Landing';
import Home from '../Home';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import Account from '../Account';
import Admin from '../Admin';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../../services/firebase/firebaseContextHOC';

function App(props) {
  const [authUser, setAuthUser] = useState(null);

  const onAuthChange = authUser => {
    setAuthUser(authUser);
  };

  // REFERENCE:  https://dev.to/bmcmahen/using-firebase-with-react-hooks-21ap
  useEffect(() => {
    // listen for auth state changes
    const listener = props.firebase.auth.onAuthStateChanged(onAuthChange);

    // cleanup on unmount
    return () => listener();
  }, [props.firebase.auth]);

  return (
    <Router>
      <>
        <Navigation authUser={authUser} />
        <hr />
        <Route exact path={ROUTES.LANDING} component={Landing} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.ACCOUNT} component={Account} />
        <Route path={ROUTES.ADMIN} component={Admin} />
      </>
    </Router>
  );
}

export default withFirebase(App);
