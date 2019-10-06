import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../../services/firebase';
import SignOutButton from '../../components/SignOut/index';
import ROLES from '../../constants/roles';

const Navigation = () => {
  return (
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <NavigationWithAuth authUser={authUser} />
        ) : (
          <NavigationNonAuth />
        )
      }
    </AuthUserContext.Consumer>
  );
};

const NavigationWithAuth = props => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>

    {props.authUser.role === ROLES.SITE_ADMIN && (
      <li>
        <Link to={ROUTES.ADMIN}>APP ADMIN</Link>
      </li>
    )}

    <li>
      <SignOutButton />
    </li>
  </ul>
);

// reference for link state:  https://tylermcginnis.com/react-router-pass-props-to-link/
const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={{ pathname: ROUTES.SIGN_IN, state: { viaSignInLink: true } }}>
        Sign In
      </Link>
    </li>
  </ul>
);

export default Navigation;
