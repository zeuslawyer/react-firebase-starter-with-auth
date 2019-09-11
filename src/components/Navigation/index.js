import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={ROUTES.SIGN_IN}>SIGN IN</Link>
        </li>
        <li>
          <Link to={ROUTES.LANDING}>LANDING</Link>
        </li>
        <li>
          <Link to={ROUTES.HOME}>HOME</Link>
        </li>
        <li>
          <Link to={ROUTES.ACCOUNT}>ACCOUNT</Link>
        </li>
        <li>
          <Link to={ROUTES.ADMIN}>ADMIN</Link>
        </li>
        <li>
          <Link to={ROUTES.SIGN_UP}>SIGNUP</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
