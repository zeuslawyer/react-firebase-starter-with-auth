import React, { useState, useEffect } from 'react';
import ROLES from '../../constants/roles';

function UserItem(props) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [passwordResetComplete, setPasswordResetComplete] = useState(false);

  useEffect(() => {
    console.log('deps test userItem')

    // if users navigated to view user list by clicking on a <UserList /> Link, receive state from that Link
    if (props.location.state) {
      setUser(props.location.state.user);
      setLoading(false);
    } else {
      console.info('loading from database...');
      props.firebase._user(props.match.params.id).on('value', snapshot => {
        setUser(snapshot.val());
        setLoading(false);
      });
    }
    // cleanup
    return () => {
      props.firebase._user(props.match.params.id).off();
    };
  }, [props.firebase, props.location.state, props.match.params]);

  return loading ? null : (
    <>
      <h2>UserId: {props.match.params.id}</h2>
      <p>{user.email}</p>
      <p>
        <strong>User type: </strong>
        {Object.entries(ROLES).find(pair => pair[1] === user.role)[0] || null}
      </p>
      <button
        type='button'
        disabled={passwordResetComplete}
        onClick={() => {
          props.firebase
            ._resetPassword(user.email)
            .then(r => {
              console.log(r);
              setPasswordResetComplete(true);
            })
            .catch(e => {
              throw new Error(e);
            });
        }}
      >
        {passwordResetComplete ? 'Done' : 'Send Password Reset Email'}
      </button>
    </>
  );
}

export default UserItem;
