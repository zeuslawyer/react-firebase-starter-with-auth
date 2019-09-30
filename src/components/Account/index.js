import React from 'react';
import { Protected } from '../../services/firebase';

import PasswordResetPage from '../PasswordChange';

function Account({ authUser }) {
  return (
    <div>
      <h1>ACCOUNT PAGE</h1>
      <p> Username: {authUser.email}</p>
      <PasswordResetPage />
    </div>
  );
}

export default Protected(Account);
