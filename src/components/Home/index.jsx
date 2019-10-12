import React from 'react';
import { Protected } from '../../services/firebase';
import envs from '../../constants/envs';

function Home({ authUser, ...props }) {
  console.log(process.env.NODE_ENV !== envs.dev);
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
    </div>
  );
}

export default Protected(Home);
