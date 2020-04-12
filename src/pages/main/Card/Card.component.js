import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { map } from 'lodash';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { LocationOn, Home, ThumbUp } from '@material-ui/icons';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
  },
  image: {
    width: 200,
    height: 200,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function ComplexGrid({
  name,
  cover,
  accommodationType,
  address,
  summaryReview,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <img className={classes.img} alt="complex" src={`https:${cover}`} />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="h6">{name}</Typography>
                <Typography style={{ fontSize: 12 }}>
                  <Home style={{ fontSize: 12 }} />
                  {accommodationType}
                </Typography>
                <Typography
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: 'deepskyblue',
                  }}>
                  <LocationOn style={{ fontSize: 12 }} />
                  {address?.address1}
                </Typography>
              </Grid>
              <Grid item>
                {map(summaryReview?.features, (feature, i) => (
                  <Chip
                    key={i}
                    size="small"
                    label={feature}
                    color="secondary"
                    variant="outlined"
                  />
                ))}
              </Grid>
            </Grid>
            <Grid
              item
              style={{
                marginLeft: 24,
                paddingLeft: 24,
                borderLeft: '1px solid rgba(0,0,0,0.1)',
              }}>
              <Typography variant="subtitle1">
                <ThumbUp color="primary" />
                {summaryReview?.scoreText}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
