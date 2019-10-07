# CREATE REACT APP + JAVASCRIPT + NODE + REDUX + FIREBASE

This is meant to be a boilerplate app to clone for future auth purposes.  
The Firebase project used for bootstrapping this is `myuniversalserver`

**uses`yarn` for dependency management and for scripts**

### notes on architecture

1. The project uses `contexts` to pass data. For example, the firebase class is passed to relevant components using contexts. Both `Context.Consumer` and the `useContext` APIs have been used.

2. the firebase wrapper class has an `auth` property which is effectively a singleton object available through the withFirebaseHOC which injects an instance of the firebase wrapper class into the application, at the `<App />` level via a `AuthUserContext.Provider`

3. this firebase object that gets passed through application context API is where the `onAuthStateChanged` listener attaches. The listener attaches in more than one place in the app, but in all cases it attaches to the one singleton object.

4. each folder is designed to be a module - each folder has an `index.js` file that serves as an entry point to the module by exporting key objects from it.

### Congigure multiple environments for dev and prod

- https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial#firebase-in-react-setup

### Thanks to

https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial
