import React from 'react';
import { Typography } from '@material-ui/core';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import { makeStyles } from '@material-ui/styles';

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
const ProvincesTile = () => {
  const classes = useStyles();

  return (
    <div className={classes.visitsNumberContainer}>
      <LocationCityIcon className={classes.icon} />
      <Typography variant="h4">678</Typography>
    </div>
  );
};

export default ProvincesTile;
