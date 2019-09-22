import React from 'react';
import { withFirebase } from '../../services/firebase/firebaseContextHOC';

const SignOutButton = ({ firebase }) => {
  return (
    <button type='button' onClick={firebase._signOut}>
      Sign Out
    </button>
  );
};

export default withFirebase(SignOutButton);
