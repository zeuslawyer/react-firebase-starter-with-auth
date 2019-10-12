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
        <>
          <h4 style={{ textAlign: 'center' }}>
            Here are the list of users in the database
          </h4>
          <table style={{ width: '100%' }}>
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
                      <Link
                        to={{
                          pathname: `${ROUTES.ADMIN_USER}/${user.uid}`,
                          state: { user }
                        }}
                      >
                        {user.emailValue}
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

export default UserList;
