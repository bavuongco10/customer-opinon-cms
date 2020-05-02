import React from 'react';
import { map, sortBy } from 'lodash';
import Plot from 'react-plotly.js';
import { makeStyles } from '@material-ui/styles';
import classNames from 'clsx';

import getRandomColor from '../../utils/getRamdomColor.util';

const useStyles = makeStyles(() => ({
  radarContainer: {
    position: 'relative',
  },
  blur: {
    filter: 'blur(4px)',
  },
}));

const HotelByCity = ({ data }) => {
  const classes = useStyles();
  const sortedData = sortBy(data, item => -item.hotels);
  const names = map(sortedData, 'name');
  const hotels = map(sortedData, 'hotels');
  return (
    <div className={classes.radarContainer}>
      <Plot
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
        data={[
          {
            type: 'bar',
            x: names,
            y: hotels,
            marker: {
              color: hotels,
              colorscale: 'Jet',
            },
          },
        ]}
        layout={{
          autosize: true,
          xaxis: {
            tickangle: -45,
          },
        }}
      />
    </div>
  );
};
export default HotelByCity;
