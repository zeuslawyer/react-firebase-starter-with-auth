import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navigation from '../Navigation';
import Landing from '../Landing';
import Home from '../Home';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import Account from '../Account';
import Admin from '../AppAdmin';
import PasswordForgetPage from '../PasswordForget';
import * as ROUTES from '../../constants/routes';
import { WithUserContextProvider } from '../../services/firebase';
import EmailNotVerified from '../../components/EmailNotVerified';
import PageNotFound from '../404';

function App({ location }) {
  return (
    <Router>
      <Navigation />
      <hr />
      <Switch>
        <Route exact path={ROUTES.LANDING} component={Landing} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.ACCOUNT} component={Account} />
        <Route path={ROUTES.ADMIN_USER} component={Admin} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route
          path={ROUTES.EMAIL_NOT_VERIFIED}
          render={props => <EmailNotVerified {...props} />}
        />
        <Route render={props => <PageNotFound />} />
      </Switch>
    </Router>
  );
}

export default WithUserContextProvider(App);
