# CREATE REACT APP + JAVASCRIPT + NODE + REDUX + FIREBASE

This is meant to be a boilerplate app to clone for future auth purposes.  
The Firebase project used for bootstrapping this is `myuniversalserver`

**uses`yarn` for dependency management and for scripts**

### notes on architecture

1. The project uses `contexts` to pass data. For example, the firebase class is passed to relevant components using contexts. Both `Context.Consumer` and the `useContext` APIs have been used.

2. each folder is designed to be a module - each folder has an `index.js` file that serves as an entry point to the module by exporting key objects from it.

### Congigure multiple environments for dev and prod

- https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial#firebase-in-react-setup

### Thanks to

https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial
