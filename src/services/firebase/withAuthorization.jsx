import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { withFirebase, AuthUserContext } from '.';
import * as ROUTES from '../../constants/routes';

/**
 * a HOC that takes a authRulesCondition regarding route protection and redirects if users not authorized to see route.
 * It is a function that takes the authRulesCondition function as arg, and returns a function that takes a Component,  and then returns a component with redirect logic embedded in it
 * @param {function} authRulesCondition
 */
const withRouteAuthorization = authRulesCondition => {
  return function(Component) {
    const useAuthorization = props => {
      return (
        // check if the condition  // TODO:   this logic is not necessary?
        <AuthUserContext.Consumer>
          {authUser =>
            authRulesCondition(authUser) ? (
              <Component {...props} />
            ) : (
              props.history.push(ROUTES.SIGN_IN)
            )
          }
        </AuthUserContext.Consumer>
      );
    };

    return compose(
      withRouter,
      withFirebase
    )(useAuthorization);
  };
};

export default withRouteAuthorization;
