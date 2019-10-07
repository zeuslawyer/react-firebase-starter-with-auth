import React, { useState, useEffect } from 'react';

function UserItem(props) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // if users navigated by clicking on user list link, load state from link state
    if (props.location.state) {
      setUser(props.location.state.user);
      setLoading(false);
    } else {
      console.log('loading from database...');
      props.firebase._user(props.match.params.id).on('value', snapshot => {
        setUser(snapshot.val());
        setLoading(false);
      });
    }
    // cleanup
    return () => {
      props.firebase._user(props.match.params.id).off();
    };
  }, []);

  return loading ? null : (
    <>
      <h2>UserId: {props.match.params.id}</h2>
      <p>{user.emailValue}</p>
    </>
  );
}

export default UserItem;
