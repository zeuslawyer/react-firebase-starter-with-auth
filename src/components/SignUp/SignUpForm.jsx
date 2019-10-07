import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import { useFormInputHook } from '../hooks/formInputHook';
import { withFirebase } from '../../services/firebase';
import * as ROUTES from '../../constants/routes';
import ROLES from '../../constants/roles';
import envs from '../../constants/envs';

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
    // console.log(`Submitting: ${emailValue}, ${pwd1Value}, ${pwd2Value}`);

    // create firebase auth user
    props.firebase
      ._createUserWithEmailAndPassword(emailValue, pwd1Value)
      .then(authUser => {
        // get ref to db node with id of the user.id & save user to node
        props.firebase
          ._user(authUser.user.uid)
          .set({ emailValue, role: ROLES.BASIC });
      })
      .then(() => {
        // send email verification if not in dev mode

        process.env.NODE_ENV !== envs.dev &&
          props.firebase._sendEmailVerification();
      })
      .then(() => {
        // reset fields
        resetEmail();
        resetPwd2();
        resetPwd1();

        //redirect to user's home page
        props.history.push(ROUTES.HOME);
      })
      .catch(err => setError(err));
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
        type='email'
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
