import { useState } from 'react';

// REFERENCE:  https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/

/**
 * custom hook handling form inputs
 * @param {string} value - initial value of state
 * @returns {Object} result - object with the form input state value, the setValue updated, a reset function and the onChange event handler
 */
export const useFormInputHook = () => {
  const [value, setValue] = useState('');

  return {
    value,
    setValue,
    reset: () => setValue('')
  };
};
