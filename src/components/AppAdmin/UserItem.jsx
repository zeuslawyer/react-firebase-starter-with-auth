import React, { useState, useEffect } from 'react';

function UserItem(props) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    props.firebase._user(props.match.params.id).on('value', snapshot => {
      setUser(snapshot.val());
      setLoading(false);
    });
    // cleanup
    return () => {
      props.firebase._user(props.match.params.id).off();
    };
  }, []);

  return loading ? null : (
    <>
      <h2>User: {props.match.params.id}</h2>
      <p>{user.emailValue}</p>
    </>
  );
}

export default UserItem;
