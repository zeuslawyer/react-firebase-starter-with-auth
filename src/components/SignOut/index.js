import React from 'react';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../../services/firebase';
import * as ROUTES from '../../constants/routes';

const signOutAndRedirect = (firebase, history) => {
  firebase._signOut().then(() => history.push(ROUTES.LANDING));
};

const SignOutButton = ({ firebase, history }) => {
  return (
    <button
      type='button'
      onClick={() => {
        signOutAndRedirect(firebase, history);
      }}
    >
      Sign Out
    </button>
  );
};

export default withRouter(withFirebase(SignOutButton));
