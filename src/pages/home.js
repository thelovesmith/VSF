import React from 'react';
import { compose } from 'recompose';
import { styled } from '@material-ui/core/styles';
import Layout from '../components/layout';
import {
  withAuthorization,
  withEmailVerification,
} from '../components/Session';
import Messages from '../components/Messages';
import { Typography } from '@material-ui/core';

const DIV = styled(Typography)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const HomePageBase = () => (
  <DIV variant="body1">
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>

    <Messages />
  </DIV>
);

const condition = authUser => !!authUser;

const HomePage = compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePageBase);

export default () => (
  <Layout>
    <HomePage />
  </Layout>
);
