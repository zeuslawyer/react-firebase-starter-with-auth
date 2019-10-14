# CREATE REACT APP + JAVASCRIPT + NODE + REDUX + FIREBASE

This is meant to be a boilerplate app to clone for future auth purposes.  
The Firebase project used for bootstrapping this is `myuniversalserver`

\*_uses`yarn` for dependency management and for scripts_

### notes on architecture

1. The project uses `contexts` to pass data. For example, the firebase class is passed to relevant components using contexts. Both `Context.Consumer` and the `useContext` APIs have been used.

2. the firebase wrapper class `firebaseAPI` has an `auth` property which is effectively a singleton object available through the withFirebaseHOC which injects an instance of the firebase wrapper class into the application, at the `<App />` level via a `AuthUserContext.Provider`. This can be consumed using

```javascript
const authUserContext = useContext(AuthUserContext);
```

from any child of the top level `<App />` component. See example of it being consumed in `Protected`

3. this firebase object that gets passed through application context API is where the `onAuthStateChanged` listener attaches. The listener attaches in more than one place in the app, but in all cases it attaches to the one singleton object.

4. each folder is designed to be a module - each folder has an `index.js` file that serves as an entry point to the module by exporting key objects from it.

5. the Main HOCs are `withFirebase` and `Protected`. `withFirebase` only injects the `firebaseAPI` wrapper class for use to interact with firebase services. `Protected` includes that plus the `AuthUser` object and is used to wrap components that are accessed through protected routes.

### Congigure multiple environments for dev and prod

- https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial#firebase-in-react-setup

### Thanks to

https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial
