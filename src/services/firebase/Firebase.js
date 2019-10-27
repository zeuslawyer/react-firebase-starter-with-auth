import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import { firebaseConfig } from '../../config';

/**
 * An interface wrapper for the Firebase API. Covers firebase Auth and firebase database
 */
export class FirebaseApi {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.database();
  }

  // **** AUTH API *****

  /**
   * signup / create new uer.
   *
   * Note: The user's password is NOT the password used to access the user's email account. The email address serves as a unique identifier for the user, and the password is used to access the user's account in your Firebase project.
   * @param {string} email - the email of the user being created
   * @param {string} password - the pwd of the user being created
   */
  _createUserWithEmailAndPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  };

  /**
   * Use firebase to send an email verification. Users can access the app only after verification via email.
   */
  _sendEmailVerification = () => {
    return this.auth.currentUser.sendEmailVerification({
      url: firebaseConfig.EMAIL_VERIFICATION_REDIRECT
    });
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

  /** Signout the user.
   * --
   * Will trigger every instance of firebase.auth.onAuthStateChanged() in the app. */
  _signOut = () => this.auth.signOut();

  /**
   * update  or change password. The user must have recently signed in for this to work.  refer to API docs.
   * @param {string} newPassword - the new password
   */
  _updatePassword = newPassword => {
    this.auth.currentUser.updatePassword(newPassword);
  };

  /**
   * send the password reset email to user
   * @param {string} email - the users email to send the reset email to
   */
  _resetPassword = email => this.auth.sendPasswordResetEmail(email);

  // **** USER API *****

  /** get ref to singe user by uid
   * @param {string} uid - string uid
   */
  _user = uid => this.db.ref(`reduxFbReact_test_users/${uid}`);

  /** get ref to all users */
  _allUsers = () => this.db.ref('reduxFbReact_test_users');

  _updateUserState = async authUser => {
    // fetch user from database and merge with the auth user entity
    return await this._user(authUser.uid)
      .once('value')
      .then(snapshot => {
        const dbUser = snapshot.val();
        return (authUser = {
          uid: authUser.uid,
          email: authUser.email,
          emailVerified: authUser.emailVerified,
          providerData: authUser.providerData,
          ...dbUser
        });
      });
  };

  // ============+ MESSAGING API =============
  /**
   * get a reference to a specific message in the db
   */
  _message = id => this.db.ref(`reduxFbReact_test_messages/${id}`);


  _allMessages = () => this.db.ref(`reduxFbReact_test_messages`);
}
