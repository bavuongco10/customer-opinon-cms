import React from 'react';
import { map, sortBy } from 'lodash';
import Plot from 'react-plotly.js';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  radarContainer: {
    position: 'relative',
  },
  blur: {
    filter: 'blur(4px)',
  },
}));

const CommentByCity = ({ data }) => {
  const classes = useStyles();
  const sortedData = sortBy(data, item => -item.comments);
  const names = map(sortedData, 'name');
  const comments = map(sortedData, 'comments');
  return (
    <div className={classes.radarContainer}>
      <Plot
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
        data={[
          {
            type: 'bar',
            x: names,
            y: comments,
            marker: {
              color: comments,
              colorscale: 'Electric',
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
export default CommentByCity;
