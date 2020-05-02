import React from 'react';
import { get, map, sortBy } from 'lodash';
import Plot from 'react-plotly.js';
import { makeStyles } from '@material-ui/styles';
import { useAsync } from 'react-use';

import { API_HOST } from '../../constants/main.constants';

const useStyles = makeStyles(() => ({
  radarContainer: {
    position: 'relative',
  },
  blur: {
    filter: 'blur(4px)',
  },
}));

const RankingHotelsPivot = () => {
  const classes = useStyles();
  const defaultUrl = `${API_HOST}/api/ranking-hotels-pivot`;

  const state = useAsync(async () => {
    const response = await fetch(defaultUrl);
    return response.json();
  }, []);

  const pivotData = get(state, 'value.items', []);

  const sortedData = sortBy(pivotData, item => -item.rate);
  const rate = map(sortedData, 'rate');
  const hotels = map(sortedData, 'hotels');

  return (
    <div className={classes.radarContainer}>
      <Plot
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
        data={[
          {
            type: 'bar',
            x: hotels,
            y: rate,
            marker: {
              color: hotels,
              colorscale: 'YlOrRd',
            },
            orientation: 'h',
          },
        ]}
        layout={{
          autosize: true,
        }}
      />
    </div>
  );
};
export default RankingHotelsPivot;
