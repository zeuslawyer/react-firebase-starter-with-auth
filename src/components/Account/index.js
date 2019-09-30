import React from 'react';
import { Protected } from '../../services/firebase';

import PasswordChangePage from '../PasswordChange';

function Account() {
  return (
    <div>
      <h1>ACCOUNT PAGE</h1>
      <PasswordChangePage />
    </div>
  );
}

export default Protected(Account);
