import React from 'react';
import { Protected } from '../../services/firebase';

function Home() {
  return (
    <div>
      <h3>HOME PAGE</h3>
      <p>this is a protected route</p>
    </div>
  );
}

export default Protected(Home);
