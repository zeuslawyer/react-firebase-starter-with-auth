import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { useFormInputHook } from '../hooks/formInputHook';
import { withFirebase } from '../../services/firebase/context.js';
import * as ROUTES from '../../constants/routes';

// this component is NOT as per the guide.  Using hooks instead of stateful class component
// REFERENCE:  https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/

const _SignUpForm = props => {
  //hooks
  const [error, setError] = useState({ message: '' });

  // destructure object and rename the property names from custom formHook
  const {
    value: emailValue,
    setValue: setEmailValue,
    reset: resetEmail
  } = useFormInputHook();
  const {
    value: pwd1Value,
    setValue: setpwd1Value,
    reset: resetPwd1
  } = useFormInputHook();
  const {
    value: pwd2Value,
    setValue: setpwd2Value,
    reset: resetPwd2
  } = useFormInputHook();

  // on submit handler
  const onSubmit = e => {
    e.preventDefault();
    console.log(`Submitting: ${emailValue}, ${pwd1Value}, ${pwd2Value}`);

    props.firebase
      ._createUserWithEmailAndPassword(emailValue, pwd1Value)
      .then(authUser => {
        // reset fields
        resetEmail();
        resetPwd2();
        resetPwd1();

        // use the returned authorised user object
        console.log('RETURNED FROM FIREBASE:  ', authUser);
        //redirect to user's home page
        // props.history.push(ROUTES.HOME);
      })
      .catch(err => setError({ message: err.message }));
  };

  // basic form validation, disables button too
  const isInvalidInput = pwd1Value !== pwd2Value;

  useEffect(() => {
    isInvalidInput && setError({ message: "Passwords don't match." });
    !isInvalidInput && setError({ message: '' });
  }, [isInvalidInput]);

  return (
    <form onSubmit={onSubmit}>
      <input
        name='email'
        value={emailValue}
        onChange={e => setEmailValue(e.target.value)}
        type='text'
        placeholder='email'
        required
      ></input>
      <input
        name='pwd1'
        value={pwd1Value}
        onChange={e => setpwd1Value(e.target.value)}
        type='password'
        placeholder='password'
        required
      ></input>
      <input
        name='pwd2'
        value={pwd2Value}
        onChange={e => setpwd2Value(e.target.value)}
        type='password'
        placeholder='Enter password again'
        required
      ></input>
      <button type='submit' disabled={isInvalidInput}>
        Sign Up
      </button>

      {error.message && <p style={{ color: 'red' }}>{error.message}</p>}
    </form>
  );
};

// wrap with react router, then inject firebaseApi into form
const SignUpForm = compose(
  withRouter,
  withFirebase
)(_SignUpForm);
export default SignUpForm;
