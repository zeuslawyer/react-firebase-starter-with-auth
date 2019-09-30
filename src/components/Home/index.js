import React from 'react';
import { withRouteAuthorization } from '../../services/firebase';

function Home() {
  return (
    <div>
      <h3>HOME PAGE</h3>
      <p>this is a protected route</p>
    </div>
  );
}
const condition = authUser => {
  console.log('hmmm', !!authUser);
  return !!authUser;
};

export default withRouteAuthorization(condition)(Home);
