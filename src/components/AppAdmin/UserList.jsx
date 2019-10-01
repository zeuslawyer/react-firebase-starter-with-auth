import React from 'react';

const contentStyle = {
  textAlign: 'center'
};

function UserList(props) {
  return (
    <table style={{ width: '100%' }}>
      <caption>All users in db</caption>
      <thead>
        <tr>
          <th style={contentStyle}>UID</th>
          <th style={contentStyle}>Email</th>
        </tr>
      </thead>
      <tbody>
        {props.users.map(user => (
          <tr key={user.uid}>
            <td style={contentStyle}>{user.uid}</td>
            <td style={contentStyle}>{user.emailValue}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserList;
