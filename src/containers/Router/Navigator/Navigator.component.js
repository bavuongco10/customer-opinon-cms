import React, { Component } from 'react';
import clsx from 'clsx';
import {
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Avatar,
} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import ArchiveIcon from '@material-ui/icons/Archive';
import { map } from 'lodash';
import { makeStyles } from '@material-ui/styles';
import { Link } from '@reach/router';

import { logo192 } from '../../../assets/images';

const categories = [
  {
    id: 'Main',
    children: [
      {
        id: 'Dashboard',
        icon: <DashboardIcon />,
        active: true,
        link: '/dashboard',
      },
      { id: 'Source', icon: <TrackChangesIcon />, link: '/source' },
      { id: 'Analyze', icon: <ArchiveIcon />, link: '/analyze' },
    ],
  },
];

const useStyles = makeStyles(theme => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
    fontSize: '0.75rem',
    fontWeight: '400',
    opacity: '0.7',
  },
  item: {
    color: 'rgba(255, 255, 255)',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(3),
    paddingRight: 20,
    '&:hover,&:focus': {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
    fontWeight: 500,
  },
  itemPrimary: {
    fontSize: 'inherit',
    marginTop: 0,
    marginBottom: 0,
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
}));

// eslint-disable-next-line react/prefer-stateless-function
class NavLink extends Component {
  render() {
    return (
      <Link
        {...this.props}
        getProps={({ isCurrent }) =>
          // the object returned here is passed to the
          // anchor element's props
          ({
            style: {
              backgroundColor: isCurrent ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
            },
          })
        }
      />
    );
  }
}

const Navigator = props => {
  const classes = useStyles();
  return (
    <Drawer {...props}>
      <List disablePadding>
        <ListItem className={clsx(classes.firebase, classes.itemCategory)}>
          <ListItemAvatar>
            <Avatar src={logo192} />
          </ListItemAvatar>
          ODDS
        </ListItem>
        {map(categories, ({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}>
                {id}
              </ListItemText>
            </ListItem>
            {map(children, ({ id: childId, icon, link }) => (
              <ListItem
                key={childId}
                button
                className={classes.item}
                component={NavLink}
                to={link}>
                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                  }}>
                  {childId}
                </ListItemText>
              </ListItem>
            ))}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};
export default Navigator;
