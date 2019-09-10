import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './components/App';
import { FirebaseApi, firebaseContext } from './services/firebase';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <firebaseContext.Provider value={new FirebaseApi()}>
    <App />
  </firebaseContext.Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
