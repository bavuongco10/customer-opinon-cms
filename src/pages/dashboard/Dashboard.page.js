import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { get, values } from 'lodash';
import { useAsync } from 'react-use';

import Title from '../../components/Title/Title.component';
import Widget from '../../components/Widget/Widget.component';
import { API_HOST } from '../../constants/main.constants';

import RankingHotelsPivot from './RankingHotelsPivot';
import DenseTable from './DenseTable';
import ProvincesTile from './ProvincesTile.container';
import HotelsTile from './HotelsTile.container';
import RecordsTile from './RecordsTile.container';
import SentimentChart from './SentimentChart.container';
import HotelByCity from './HotelByCity';
import CommentByCity from './CommentByCity';
import HotelFeatures from './HotelFeatures';

const Dashboard = () => {
  const [allAspects, setAllAspects] = useState({
    allAspects: {},
  });
  const radarData = values(allAspects.allAspects) || [];
  const defaultUrl = `${API_HOST}/api/hotels-pivot`;

  const state = useAsync(async () => {
    const response = await fetch(defaultUrl);
    return response.json();
  }, []);

  const summaryState = useAsync(async () => {
    const response = await fetch(`${API_HOST}/api/summary`);
    return response.json();
  }, []);

  const hotelsPivotData = get(state, 'value.items', []);
  const summaryData = get(summaryState, 'value.item', {});

  return (
    <>
      <Title>Dashboard</Title>
      <Grid container spacing={4}>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Widget title="Collected Provinces" upperTitle disableWidgetMenu>
            <ProvincesTile count={summaryData.cities} />
          </Widget>
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Widget title="Collected Hotels" upperTitle disableWidgetMenu>
            <HotelsTile count={summaryData.hotels} />
          </Widget>
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <RecordsTile count={summaryData.sources} />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Widget title="Hotels By City" upperTitle disableWidgetMenu>
            <HotelByCity data={hotelsPivotData} />
          </Widget>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Widget title="Comments By City" upperTitle disableWidgetMenu>
            <CommentByCity data={hotelsPivotData} />
          </Widget>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Widget title="Hotel Rankings Summary" upperTitle disableWidgetMenu>
            <RankingHotelsPivot />
          </Widget>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Widget title="Hotel Features" upperTitle disableWidgetMenu>
            <HotelFeatures />
          </Widget>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Widget title="Compare Hotels" upperTitle disableWidgetMenu>
            <DenseTable setAllAspects={setAllAspects} />
          </Widget>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <SentimentChart data={radarData} />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
