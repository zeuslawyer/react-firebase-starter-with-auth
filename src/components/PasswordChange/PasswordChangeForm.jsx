import React, { Component } from 'react';

import { withFirebase } from '../../services/firebase';

const INITIAL_STATE = {
  password1: '',
  password2: '',
  error: '',
  message: null
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };


  handleSubmit = e => {
    e.preventDefault();

    this.props.firebase
      ._updatePassword(this.state.password1)
      .then(email => {
        this.setState({
          ...INITIAL_STATE,
          message: 'Please check your email for reset instructions.'
        });
      })
      .catch(err => {
        this.setState({ error: `No such user found: ${this.state.email}` });
      });
  };

  handlePasswordError = (isPasswordMismatch) => {
     return isPasswordMismatch ? 'Passwords do not match. ' : 'Passwords must be at least 6 characters long.'
  }

  
  render() {
    const {password1, password2} = this.state
    const isPasswordMismatch = (password1 && password2 && (password1 !== password2))
    const isInvalid = isPasswordMismatch || (password1 && this.state.password1.length < 6);
    return (
      <>
        {this.state.message && <p>{this.state.message}</p>}

        {!this.state.message && (
          <form onSubmit={this.handleSubmit}>
            <input
              name='password1'
              type='text'
              value={this.state.password1}
              onChange={this.handleOnChange}
              placeholder='new password'
              required
            />
            <input
              name='password2'
              type='text'
              value={this.state.password2}
              onChange={this.handleOnChange}
              placeholder='confirm password'
              required
            />
            <div>
              <button type='submit' disabled={isInvalid}>
                Reset my password
              </button>
              {this.state.error && (
                <p style={{ color: 'red' }}>{this.state.error}</p>
              )}
              {isInvalid && (
                <p style={{ color: 'red' }}>{this.handlePasswordError(isPasswordMismatch)}</p>
              )}
            </div>
          </form>
        )}
      </>
    );
  }
}

export default withFirebase(PasswordChangeForm);
