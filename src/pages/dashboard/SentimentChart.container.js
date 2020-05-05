import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from 'recharts';
import { isEmpty, map } from 'lodash';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import classNames from 'clsx';

const ticks = [0, 1, 2, 3, 4, 5];

const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y +
  height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y +
  height} ${x + width}, ${y + height}
          Z`;

const TriangleBar = props => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const useStyles = makeStyles(theme => ({
  sentimentChartContainer: {
    marginTop: 60,
  },
  actionButton: {
    margin: theme.spacing(1),
  },
  divider: {
    height: 1,
    backgroundColor: 'gray',
    marginBottom: 12,
  },
  blur: {
    filter: 'blur(4px)',
  },
}));

const SentimentChart = ({ data }) => {
  const classes = useStyles();
  return (
    <div
      className={classNames(classes.sentimentChartContainer, {
        [classes.blur]: isEmpty(data),
      })}>
      <Button color="primary" size="large" className={classes.actionButton}>
        Hotels Ranking chart
      </Button>
      <Divider className={classes.divider} />
      <BarChart width={500} height={350} data={data} margin={{ left: -30 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hotelName" hide />
        <YAxis ticks={ticks} tickCount={5} />
        <Tooltip />
        <Bar
          dataKey="sentiment"
          fill="#8884d8"
          label={{ position: 'top' }}
          shape={<TriangleBar />}>
          {map(data, (value, index) => (
            <Cell key={`cell-${index}`} fill={value.color} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};

export default SentimentChart;
