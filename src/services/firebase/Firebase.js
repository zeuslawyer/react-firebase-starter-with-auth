import app from 'firebase/app';
import 'firebase/auth';

import { firebaseConfig } from '../../config/dev.secrets';

export class FirebaseApi {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
  }

  /**
   * signup / create new uer.  wrapper around firebase method creatUserWithEmailAndPassword
   *
   * Note: The user's password is NOT the password used to access the user's email account. The email address serves as a unique identifier for the user, and the password is used to access the user's account in your Firebase project.
   * @param {string} email - the email of the user being created
   * @param {string} password - the pwd of the user being created
   */
  _createUserWithEmailAndPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  };

  /**
   * sign in the user
   *
   * Note: The user's password is NOT the password used to access the user's email account. The email address serves as a unique identifier for the user, and the password is used to access the user's account in your Firebase project.
   * @param {string} email - the email of the user being logged in
   * @param {string} password - the pwd of the user being logged in
   */
  _signInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  };

  /** signout the user */
  _signOut = () => this.auth.signOut();

  /**
   * update  or change password. The user must have recently signed in for this to work.  refer to API docs.
   * @param {string} newPassword - the new password
   */
  _updatePassword = newPassword =>
    this.auth.currentUser.updatePassword(newPassword);

    /**
     * send the password reset email to user
     * @param {string} email - the users email to send the reset email to
     */
  _resetPassword =  (email) => this.auth.sendPasswordResetEmail(email)
}
