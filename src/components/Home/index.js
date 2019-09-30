import React from 'react';
import { Protected } from '../../services/firebase';

function Home({ authUser, ...props }) {
  return (
    <div>
      <h3>HOME PAGE</h3>
      <p>Welcome, {authUser.email}!</p>
    </div>
  );
}

export default Protected(Home);
