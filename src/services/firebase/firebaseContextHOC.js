import React, { useContext } from 'react';

export const FirebaseContext = React.createContext(null);

/**
 * HOC that injects the firebaseApi into the child component. Returns the component as a context consumer, with its native props
 * and injected firebaseApi prop
 * @param {Object} Component - the Component to be injected with the firebaseApi
 *
 */

 // NOTE:  this uses the Consumer wrapper
// export const withFirebase = Component => {
//   return props => {
//     return (
//       <FirebaseContext.Consumer>
//         {firebase => <Component {...props} firebase={firebase} />}
//       </FirebaseContext.Consumer>
//     );
//   };
// };


// this uses the useContext Hook
export const withFirebase = Component => {
  return props => {
    const context = useContext(FirebaseContext);
    return <Component {...props} firebase={context} />;
  };
};
