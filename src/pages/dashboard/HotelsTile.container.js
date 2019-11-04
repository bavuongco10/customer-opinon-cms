import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import HotelIcon from '@material-ui/icons/Hotel';

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
const HotelsTile = () => {
  const classes = useStyles();

  return (
    <div className={classes.visitsNumberContainer}>
      <HotelIcon className={classes.icon} />
      <Typography variant="h4">1290</Typography>
    </div>
  );
};

export default HotelsTile;
