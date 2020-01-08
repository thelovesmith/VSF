import React, { useState } from 'react';
import { Link } from 'gatsby';
import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  EventNote as EventNoteIcon,
  People as PeopleIcon,
} from '@material-ui/icons';

import classNames from 'classnames';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#383838',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    fontSize: 40,
  },
  drawerPaper: {
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  drawer: {
    height: '100vh',
  },
});
const Navigation = styles => {
  const [drawerOpen, setDrawer] = useState(true);
  const handleDrawerOpen = () => {
    setDrawer(true);
  };
  const handleDrawerClose = () => {
    setDrawer(false);
  };
  const { classes } = styles;

  return (
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <NavigationAuth
            authUser={authUser}
            classes={classes}
            handleDrawerOpen={handleDrawerOpen}
            handleDrawerClose={handleDrawerClose}
            drawerOpen={drawerOpen}
          />
        ) : (
          <NavigationNonAuth
            classes={classes}
            handleDrawerOpen={handleDrawerOpen}
            handleDrawerClose={handleDrawerClose}
            drawerOpen={drawerOpen}
          />
        )
      }
    </AuthUserContext.Consumer>
  );
};

const NavigationAuth = ({
  authUser,
  classes,
  handleDrawerOpen,
  handleDrawerClose,
  drawerOpen,
}) => {
  return (
    <>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={classNames(
          classes.appBar,
          drawerOpen && classes.appBarShift,
        )}
      >
        <Toolbar
          disableGutters={drawerOpen}
          className={classes.toolbar}
        >
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={classNames(
              classes.menuButton,
              drawerOpen && classes.menuButtonHidden,
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h2"
            variant="h2"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Vision Solar Finance
          </Typography>

          <SignOutButton />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(
            classes.drawerPaper,
            !drawerOpen && classes.drawerPaperClose,
            classes.drawer,
          ),
        }}
        open={drawerOpen}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <div>
            <Link to={ROUTES.LANDING}>
              <ListItem>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Landing" />
              </ListItem>
            </Link>
            <Link to={ROUTES.HOME}>
              <ListItem>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            <Link to={ROUTES.ACCOUNT}>
              <ListItem>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Account" />
              </ListItem>
            </Link>
            {!!authUser.roles[ROLES.ADMIN] && (
              <Link to={ROUTES.ADMIN}>
                <ListItem>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Admin" />
                </ListItem>
              </Link>
            )}
          </div>
        </List>
      </Drawer>
    </>
  );
};

const NavigationNonAuth = ({
  classes,
  handleDrawerOpen,
  handleDrawerClose,
  drawerOpen,
}) => (
  <>
    <Drawer
      variant="permanent"
      classes={{
        paper: classNames(
          classes.drawerPaper,
          !drawerOpen && classes.drawerPaperClose,
        ),
      }}
      open={drawerOpen}
    >
      <div className={classes.toolbarIcon}>
        <IconButton
          onClick={drawerOpen ? handleDrawerClose : handleDrawerOpen}
        >
          {drawerOpen && <ChevronLeftIcon />}
          {!drawerOpen && <MenuIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        <div>
          <Link to={ROUTES.LANDING}>
            <ListItem>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Landing" />
            </ListItem>
          </Link>
          <Link to={ROUTES.SIGN_IN}>
            <ListItem>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Sign In" />
            </ListItem>
          </Link>
        </div>
      </List>
    </Drawer>
  </>
);

export default withStyles(styles)(Navigation);
