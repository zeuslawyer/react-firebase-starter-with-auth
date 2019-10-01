import React from 'react';

const contentStyle = {
  textAlign: "center"
}

function UserList(props) {
  return (
    <table style={{width: "100%"}}>
      <tr>
        <th style={contentStyle}>UID</th>
        <th style={contentStyle}>Email</th>
      </tr>
      {props.users.map(user=>(
        <tr>
        <td style={contentStyle}>{user.uid}</td>
        <td style={contentStyle}>{user.emailValue}</td>
      </tr>
      ))}
    </table>
  );
}

export default UserList;
