import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PeopleIcon from '@material-ui/icons/People';

import Widget from '../../components/Widget/Widget.component';

const useStyles = makeStyles(theme => ({
  visitsNumberContainer: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    paddingBottom: theme.spacing(1),
    color: '#FFF',
  },
  icon: {
    width: '3rem',
    height: '3rem',
    background: '#FFF',
    borderRadius: '50%',
    padding: '0.5rem',
    color: theme.palette.primary.main,
    marginRight: theme.spacing(2),
  },
  widget: {
    background: theme.palette.primary.main,
  },
  widgetTitle: {
    color: '#FFF',
  },
}));
const RecordsTile = () => {
  const classes = useStyles();

  return (
    <Widget
      title="Collected Records"
      upperTitle
      disableWidgetMenu
      paperClass={classes.widget}
      titleClass={classes.widgetTitle}>
      <div className={classes.visitsNumberContainer}>
        <PeopleIcon className={classes.icon} />
        <Typography variant="h4">105644</Typography>
      </div>
    </Widget>
  );
};

export default RecordsTile;
