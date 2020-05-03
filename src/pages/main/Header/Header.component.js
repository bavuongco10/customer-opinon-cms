import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
  appBar: {
    color: 'rgb(158, 158, 158)',
    boxShadow: 'rgba(53, 64, 82, 0.05) 0px 0px 14px 0px',
    background: 'rgb(255, 255, 255)',
  },
}));

const Header = ({}) => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <Typography
                variant="h4"
                style={{ color: '#005180', fontWeight: 'bold' }}>
                ODSS
              </Typography>
            </Grid>
            <Grid item xs />
            <Grid item>
              <Tooltip title="Alerts • No alters">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Button color="primary" href="sign-in">
                Sign In
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
