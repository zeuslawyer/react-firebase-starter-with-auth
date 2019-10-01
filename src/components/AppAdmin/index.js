import React, { useEffect, useState } from 'react';
import { Protected } from '../../services/firebase';
import UserList from './UserList';

function AppAdmin({ firebase, authUser }) {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    // attach listener to all users node in database
    firebase._allUsers().on('value', snapshot => {
      let users = snapshot.val(); // is an object
      users = Object.keys(users).map(key => ({ uid: key, ...users[key] })); // transform to array

      setUsers(users);
      setLoading(false);
    });

    //remove listener
    return () => {
      firebase._allUsers().off();
    };
  }, [loading]);

  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>Welcome {authUser.email}!</h3>
      {loading && 'LOADING...'}
      {!loading && <UserList users={users} />}
    </div>
  );
}

export default Protected(AppAdmin);
