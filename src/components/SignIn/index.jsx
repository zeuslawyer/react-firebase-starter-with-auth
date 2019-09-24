import React from 'react';

import SignInForm from './SignInForm';
import SignUpLink from '../SignUp/SignUpLink';
import { PasswordForgetLink } from '../PasswordForget';

function SignInPage() {
  return (
    <>
      <h2>Login</h2>
      <SignInForm />
      <SignUpLink />
      <PasswordForgetLink />
    </>
  );
}

export default SignInPage;
