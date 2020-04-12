import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { map } from 'lodash';

import { actions } from './main.reducer';
import SearchesBar from './SearchesBar/SearchesBar.component';
import Header from './Header/Header.component';
import Card from './Card/Card.component';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
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

const MainPage = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    dispatch(actions.getInitialRankingsAction());
    return dispatch(actions.cleanUpAction());
  }, [dispatch]);

  const hotelRankings = useSelector(state => state?.main?.rankings);

  return (
    <div className={classes.root}>
      <div className={classes.app}>
        <Header />
        <SearchesBar />
        <main className={classes.main}>
          <Grid
            container
            spacing={1}
            alignItems="center"
            justify="center"
            direction="column">
            {map(hotelRankings, item => (
              <Grid item key={item._id} style={{ width: '70%' }}>
                <Card {...item} />
              </Grid>
            ))}
          </Grid>
        </main>
      </div>
    </div>
  );
};

export default MainPage;
