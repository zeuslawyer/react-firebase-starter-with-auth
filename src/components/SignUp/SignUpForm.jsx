import React, { useState, useEffect } from 'react';

import { useFormHook } from '../hooks/formInputHook';

// this is not as per the guide.  Using hooks instead of stateful class component
// REFERENCE:  https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/

const SignUpForm = props => {
  //hooks
  const [error, setError] = useState({ message: '' });

  // destructure object and rename the property names from custom formHook
  const {
    value: emailValue,
    setValue: setEmailValue,
    reset: resetEmail
  } = useFormHook('');
  const {
    value: pwd1Value,
    setValue: setpwd1Value,
    reset: resetPwd1
  } = useFormHook('');
  const {
    value: pwd2Value,
    setValue: setpwd2Value,
    reset: resetPwd2
  } = useFormHook('');

  // on submit handler
  const onSubmit = e => {
    e.preventDefault();
    console.log(`Submitting: ${emailValue}, ${pwd1Value}, ${pwd2Value}`);

    resetEmail();
    resetPwd2();
    resetPwd1();
  };

  // basic form validation, disables button too
  const isInvalidInput = pwd1Value !== pwd2Value;

  useEffect(() => {
    isInvalidInput && setError({ message: "Passwords don't match." });
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

      {error && <p>{error.message}</p>}
    </form>
  );
};

export default SignUpForm;
