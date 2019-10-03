import React from 'react';
import { Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  divider: {
    margin: '24px 0',
  },
}));

const Title = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <Typography
        variant="h5"
        display="inline"
        gutterBottom
        className={classes.header}>
        {children}
      </Typography>
      <Divider className={classes.divider} />
    </>
  );
};
export default Title;
