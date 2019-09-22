import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import { withFirebase } from '../../services/firebase/firebaseContextHOC';
import * as ROUTES from '../../constants/routes';

// this component is NOT as per the guide.
// and it does NOT use the useFormHooks custom hook

const _SignInForm = props => {
  //hooks
  const [error, setError] = useState({ message: '', code: null });
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  // on submit handler
  const onSubmit = e => {
    e.preventDefault();

    props.firebase
      ._signInWithEmailAndPassword(email, pwd)
      .then(authUser => {
        // reset fields
        setEmail('');
        setPwd('');

        // navigate to users home page
        props.history.push(ROUTES.HOME);
      })
      .catch(err => {
        console.log(err);
        setError({ message: err.message, code: err.code });
      });
  };

  // basic form validation, disables button too
  const isInvalidInput = pwd.length > 0 && pwd.length < 6;

  useEffect(() => {
    // set error
    isInvalidInput &&
      setError({
        message: 'Password must be at least 6 characters long.',
        code: null
      });

    // unset error when fixed
    !isInvalidInput &&
      setError({
        message: '',
        code: null
      });
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
