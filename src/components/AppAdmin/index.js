import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Protected } from '../../services/firebase';
import UserList from './UserList';
import UserItem from './UserItem';
import ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

function AppAdmin({ firebase, authUser, ...props }) {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    // if user is not SITE ADMIN, navigate away
    authUser.role !== ROLES.SITE_ADMIN && props.history.push(ROUTES.HOME);

    // attach listener to all users node in database
    firebase._allUsers().on('value', snapshot => {
      let users = snapshot.val(); // is an object
      users = Object.keys(users).map(key => ({ uid: key, ...users[key] })); // transform to array of objects

      setUsers(users);
    });
    // cleanup -remove listener
    return () => {
      firebase._allUsers().off();
    };
  }, []);

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Welcome {authUser.email}!</h2>
      <p></p>
      <Switch>
        <Route
          exact
          path={ROUTES.ADMIN_USER}
          render={props => <UserList {...props} users={users} />}
        />
        <Route
          exact
          path={ROUTES.ADMIN_USER_DETAIL}
          render={props => <UserItem {...props} firebase={firebase} />}
        />
       
      </Switch>
    </>
  );
}


export default Protected(AppAdmin);
