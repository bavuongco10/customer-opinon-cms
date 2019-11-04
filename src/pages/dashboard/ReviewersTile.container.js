import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PeopleIcon from '@material-ui/icons/People';

const useStyles = makeStyles(theme => ({
  visitsNumberContainer: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    paddingBottom: theme.spacing(1),
  },
  icon: {
    width: '3rem',
    height: '3rem',
    background: theme.palette.primary.main,
    borderRadius: '50%',
    padding: '0.5rem',
    color: '#FFF',
    marginRight: theme.spacing(2),
  },
}));
const ReviewersTile = () => {
  const classes = useStyles();

  return (
    <div className={classes.visitsNumberContainer}>
      <PeopleIcon className={classes.icon} />
      <Typography variant="h4">9933</Typography>
    </div>
  );
};

export default ReviewersTile;
