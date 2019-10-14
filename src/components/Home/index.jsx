import React from 'react';

import Messages from '../../components/Messages';
import { Protected } from '../../services/firebase';
import envs from '../../constants/envs';

function Home({ authUser, ...props }) {
  return (
    <div>
      <h3>HOME PAGE</h3>
      <p>Welcome, {authUser.email}!</p>
      {process.env.NODE_ENV !== envs.prod && (
        <p style={{ color: 'red' }}>
          {' '}
          AS THIS IS DEV MODE NO FIREBASE EMAIL VERIFICATION SENT
        </p>
      )}
      <Messages />
    </div>
  );
}

export default Protected(Home);
