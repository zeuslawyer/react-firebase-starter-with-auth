import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../../services/firebase/firebaseContextHOC';
import * as ROUTES from '../../constants/routes';

// this component is NOT as per the guide.
// and it does NOT use the useFormHooks custom hook

const _SignInForm = props => {
  //hooks
  const [error, setError] = useState({ message: '' });
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  // on submit handler
  const onSubmit = e => {
    e.preventDefault();
    console.log(`Submitting: ${email}, ${pwd}`);

    props.firebase
      ._signInWithEmailAndPassword(email, pwd)
      .then(authUser => {
        // reset fields
        setEmail('');
        setPwd('');

        // navigate to users home page
        props.history.push(ROUTES.HOME);
      })
      .catch(err => setError(err));
  };

  // basic form validation, disables button too
  const isInvalidInput = pwd.length > 0 && pwd.length < 6;

  useEffect(() => {
    isInvalidInput &&
      setError({
        message: 'Password must be at least 6 characters long.'
      });
    !isInvalidInput && setError({ message: '' });
  }, [isInvalidInput]);

  return (
    <form onSubmit={onSubmit}>
      <input
        name='email'
        value={email}
        // onChange={e => setEmailValue(e.target.value)}
        onChange={e => setEmail(e.target.value)}
        type='text'
        placeholder='email'
        required
      ></input>
      <input
        name='pwd1'
        value={pwd}
        onChange={e => setPwd(e.target.value)}
        type='password'
        placeholder='password'
        required
      ></input>
      <button type='submit' disabled={isInvalidInput}>
        Login
      </button>

      {error.message && <p style={{ color: 'red' }}>{error.message}</p>}
    </form>
  );
};

// wrap with react router, then inject firebaseApi into form
const SignInForm = compose(
  withRouter,
  withFirebase
)(_SignInForm);

export default SignInForm;
