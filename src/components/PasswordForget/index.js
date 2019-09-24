import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import PasswordForgetForm from './PasswordForgetForm';

class PasswordForgetPage extends Component {
  render() {
    return (
      <div>
        <PasswordForgetForm />
      </div>
    );
  }
}

// shows up in the sign in page
export const PasswordForgetLink = () => (
  <span>
    <small>
      <Link to={ROUTES.PASSWORD_FORGET}> Forgot Password?</Link>
    </small>
  </span>
);

export default PasswordForgetPage;
