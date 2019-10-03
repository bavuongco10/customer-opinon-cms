import React from 'react';
import { Grid } from '@material-ui/core';

import Title from '../../components/Title/Title.component';
import Widget from '../../components/Widget/Widget.component';

import UberRadarChart from './UberRadarChart';

const Dashboard = () => (
  <>
    <Title>Dashboard</Title>
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Widget title="Visits Today" upperTitle disableWidgetMenu>
          <UberRadarChart />
        </Widget>
      </Grid>
    </Grid>
  </>
);
export default Dashboard;
