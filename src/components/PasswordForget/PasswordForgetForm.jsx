import React, { Component } from 'react';

import { withFirebase } from '../../services/firebase';

const INITIAL_STATE = {
  email: '',
  error: '',
  message: null
};

class PasswordForgetForm extends Component {
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
      ._resetPassword(this.state.email)
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

  render() {
    const isInvalid = this.state.email === '';
    return (
      <>
        {this.state.message && <p>{this.state.message}</p>}

        {!this.state.message && (
          <form onSubmit={this.handleSubmit}>
            <input
              name='email'
              type='email'
              value={this.state.email}
              onChange={this.handleOnChange}
              placeholder='Your email'
              required
            />
            <div>
              <button type='submit' disabled={isInvalid}>
                Reset my password
              </button>
              {this.state.error && (
                <p style={{ color: 'red' }}>{this.state.error}</p>
              )}
            </div>
          </form>
        )}
      </>
    );
  }
}

export default withFirebase(PasswordForgetForm);
