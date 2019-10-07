import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

export function DidNotGetVerification({ firebase, history }) {
  return (
    <div>
      <Link
        to={'#'}
        onClick={() => {
          console.log('CLICKED');
          firebase
            ._sendEmailVerification()
            .then(() => history.push(ROUTES.HOME));
        }}
      >
        Did not get the verification email?
      </Link>
    </div>
  );
}
