import React from 'react';
import { Grid } from '@material-ui/core';
import { useAsync } from 'react-use';
import { map, get, round } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';

import Title from '../../components/Title/Title.component';
import { API_HOST } from '../../constants/main.constants';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const HotelFeatures = () => {
  const classes = useStyles();
  const defaultUrl = `${API_HOST}/api/features`;

  const state = useAsync(async () => {
    const response = await fetch(defaultUrl);
    return response.json();
  }, []);

  const features = get(state, 'value.items', []);

  return (
    <>
      <Title>Hotel Features</Title>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Feature</TableCell>
                  <TableCell align="right">Importance (%)</TableCell>
                  <TableCell align="right" style={{ width: '30vw' }} />
                </TableRow>
              </TableHead>
              <TableBody>
                {map(features, feature => (
                  <TableRow key={feature.name}>
                    <TableCell component="th" scope="row">
                      {feature.name}
                    </TableCell>
                    <TableCell align="right">{`${round(
                      feature.importantRate * 100,
                      2
                    )}%`}</TableCell>
                    <TableCell align="right">
                      <LinearProgress
                        style={{ height: 16 }}
                        variant="determinate"
                        color="secondary"
                        value={feature.importantRate * 100}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default HotelFeatures;
