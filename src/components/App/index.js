import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import Landing from '../Landing';
import Home from '../Home';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import Account from '../Account';
import Admin from '../Admin';
import PasswordForgetPage from  '../PasswordForget'
import * as ROUTES from '../../constants/routes';
import  {withAuthUser}  from '../../services/firebase';


function App() {
  return (
    <Router>
      <Navigation />
      <hr />
      <Route exact path={ROUTES.LANDING} component={Landing} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.HOME} component={Home} />
      <Route path={ROUTES.ACCOUNT} component={Account} />
      <Route path={ROUTES.ADMIN} component={Admin} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
    </Router>
  );
}

export default withAuthUser(App);

