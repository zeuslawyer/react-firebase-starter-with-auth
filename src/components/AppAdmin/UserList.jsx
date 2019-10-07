import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const contentStyle = {
  textAlign: 'center'
};

function UserList(props) {
  return (
    <>
      {!props.users ? (
        'LOADING...'
      ) : (
        <table style={{ width: '100%' }}>
          <caption>All users in db</caption>
          <thead>
            <tr>
              <th style={contentStyle}>UID</th>
              <th style={contentStyle}>Email</th>
            </tr>
          </thead>
          <tbody>
            {props.users &&
              props.users.map(user => (
                <tr key={user.uid}>
                  <td style={contentStyle}>{user.uid}</td>
                  <td style={contentStyle}>
                    <Link to={`${ROUTES.ADMIN}/${user.uid}`} >
                      {user.emailValue}
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default UserList;
