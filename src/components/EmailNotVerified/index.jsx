// @ts-nocheck
import React from 'react';

import { DidNotGetVerification } from './didNotGetVerification';
import { withFirebase } from '../../services/firebase';

function ErrorPage({ match, location, history, firebase }) {
  return (
    <div style={{ color: 'green' }}>
      <p>
        You have not yet verified your email and account. Please check your
        email (and spam folder!) for a verification email from us.
      </p>
      <DidNotGetVerification firebase={firebase} history={history}/>
    </div>
  );
}

export default withFirebase(ErrorPage)
