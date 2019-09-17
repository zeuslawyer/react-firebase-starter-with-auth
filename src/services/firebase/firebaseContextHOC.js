import React from 'react';

export const FirebaseContext = React.createContext(null);

/**
 * HOC that injects the firebaseApi into the passed component. Returns the component, with its native props and injected firebaseApi prop
 * @param {Object} Component - the Component to be injected with the firebaseApi
 *
 */
export const withFirebase = Component => {
  return props => {
    return (
      <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
      </FirebaseContext.Consumer>
    );
  };
};
