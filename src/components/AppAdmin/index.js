import React, { useEffect, useState } from 'react';
import { Protected } from '../../services/firebase';
import UserList from './UserList';
import ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

function AppAdmin({ firebase, authUser, ...props }) {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    // if user is not SITE ADMIN, navigate away
    authUser.role !== ROLES.SITE_ADMIN && props.history.push(ROUTES.HOME);

    // attach listener to all users node in database
    firebase._allUsers().on('value', snapshot => {
      let users = snapshot.val(); // is an object
      users = Object.keys(users).map(key => ({ uid: key, ...users[key] })); // transform to array of objects

      setUsers(users);
      setLoading(false);
    });
    //remove listener
    return () => {
      firebase._allUsers().off();
    };
  }, []);

  return (
    <>
      <h3 style={{ textAlign: 'center' }}>Welcome {authUser.email}!</h3>
      <p></p>
      {loading && null}
      {!loading && <UserList users={users} />}
    </>
  );
}

export default Protected(AppAdmin);
