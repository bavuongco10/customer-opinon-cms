import React from 'react';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/styles';
import { useToggle } from 'react-use';
import classNames from 'clsx';

import Header from '../Header/Header.component';
import Navigator from '../Navigator/Navigator.component';

const drawerWidth = 256;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  drawerShift: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: '#F9F9FC',
  },
}));

const PrivateLayout = ({ children }) => {
  const classes = useStyles();
  const [mobileOpen, toggleMobileOpen] = useToggle(false);
  const [wideScreenOpen, toggleWideScreenOpen] = useToggle(true);

  return (
    <div className={classes.root}>
      <Hidden smUp>
        <nav>
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            open={mobileOpen}
            onClose={toggleMobileOpen}
          />
        </nav>
      </Hidden>
      <Hidden xsDown>
        <nav className={classNames({ [classes.drawerShift]: wideScreenOpen })}>
          <Navigator
            variant="persistent"
            anchor="left"
            PaperProps={{ style: { width: drawerWidth } }}
            open={wideScreenOpen}
            onClose={toggleWideScreenOpen}
          />
        </nav>
      </Hidden>
      <div className={classes.app}>
        <Hidden smUp>
          <Header onDrawerToggle={toggleMobileOpen} />
        </Hidden>
        <Hidden xsDown>
          <Header onDrawerToggle={toggleWideScreenOpen} />
        </Hidden>
        <main className={classes.main}>{children}</main>
      </div>
      <div />
    </div>
  );
};

export default PrivateLayout;
