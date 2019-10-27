import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Protected } from '../../services/firebase';
import UserList from './UserList';
import UserItem from './UserItem';
import ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import { useDataFetcher } from '../../hooks/useDataFetcher';

function AppAdmin({ firebase, authUser, ...props }) {
  const { data: users } = useDataFetcher(firebase._allUsers);

  useEffect(() => {
    // if user is not SITE ADMIN, navigate away
    console.log('deps test in app admin');
    authUser.role !== ROLES.SITE_ADMIN && props.history.push(ROUTES.HOME);
  }, [authUser.role, props.history]);

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Welcome {authUser.email}!</h2>
      <p></p>
      <Switch>
        <Route
          exact
          path={ROUTES.ADMIN_USER_DETAIL}
          render={props => <UserItem {...props} firebase={firebase} />}
        />
        <Route
          exact
          path={ROUTES.ADMIN_USER}
          render={props => <UserList {...props} users={users} />}
        />
      </Switch>
    </>
  );
}

export default Protected(AppAdmin);
