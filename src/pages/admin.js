import React, { Fragment, useEffect } from 'react';
import { compose } from 'recompose';

import Layout from '../components/layout.js';
import {
  withAuthorization,
  withEmailVerification,
} from '../components/Session';
import UserList from '../components/Users/UserList';
import * as ROLES from '../constants/roles';

const AdminPageBase = props => {
  useEffect(() => {
    console.log(props, 'user');
  }, []);

  return (
    <Fragment>
      <h1>Admin</h1>
      <p>
        The Admin Page is accessible by every signed in admin user.
      </p>
      {/* MUST change USERs into Reps for outr well being  */}
      <UserList />
    </Fragment>
  );
};

const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];

const AdminPage = compose(
  withEmailVerification,
  withAuthorization(condition),
)(AdminPageBase);

export default () => (
  <Layout>
    <AdminPage />
  </Layout>
);
