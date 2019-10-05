import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { values } from 'lodash';

import Title from '../../components/Title/Title.component';
import Widget from '../../components/Widget/Widget.component';

// import UberRadarChart from './UberRadarChart';
import ReRadarChart from './ReRadarChart';
import DenseTable from './DenseTable';

const Dashboard = () => {
  const [allAspects, setAllAspects] = useState({
    allAspects: {},
  });
  const radarData = values(allAspects.allAspects) || [];
  return (
    <>
      <Title>Dashboard</Title>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget title="Compare Hotels" upperTitle disableWidgetMenu>
            <Grid container spacing={2}>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                {/* <UberRadarChart data={radarData} /> */}
                <ReRadarChart data={radarData} />
              </Grid>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <DenseTable setAllAspects={setAllAspects} />
              </Grid>
            </Grid>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
