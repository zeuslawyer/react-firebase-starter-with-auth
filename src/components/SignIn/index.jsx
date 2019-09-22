import React from 'react';

import SignInForm from './SignInForm';
import SignUpLink from '../SignUp/SignUpLink';

function SignInPage() {
  return (
    <>
      <h2>Login</h2>
      <SignInForm />
      <SignUpLink />
    </>
  );
}

export default SignInPage;
