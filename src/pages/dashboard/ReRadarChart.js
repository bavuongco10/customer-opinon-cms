import React from 'react';
import { isEmpty, map, forEach } from 'lodash';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  PolarRadiusAxis,
} from 'recharts';
import { makeStyles } from '@material-ui/styles';
import classNames from 'clsx';

import getRandomColor from '../../utils/getRamdomColor.util';

const ASPECTS = [
  'khách sạn',
  'view',
  'món ăn',
  'thiết bị',
  'ban công',
  'phòng',
  'lễ tân',
  'nội thất',
  'vệ sinh',
  'cảnh',
  'nhân viên',
  'không gian',
  'thang máy',
  'wifi',
  'đèn',
  'giá',
  'thái độ',
  'xe máy',
  'toilet',
  'sảnh',
  'biển',
  'nhà hàng',
  'máy lạnh',
  'khuôn viên',
  'diện tích',
  'vị trí',
  'mùi',
  'khăn',
  'bãi tắm',
  'bồn tắm',
  'dịch vụ',
  'bể bơi',
  'cửa sổ',
  'hành lang',
  'bar',
  'giường',
  'thức ăn',
  'tủ lạnh',
  'hướng',
  'bếp',
];

const DOMAINS = map(ASPECTS, aspect => ({
  subject: aspect,
  fullMark: 100,
}));

const useStyles = makeStyles(() => ({
  radarContainer: {
    position: 'relative',
  },
  blur: {
    filter: 'blur(4px)',
  },
}));

const ReRadarChart = ({ data }) => {
  const classes = useStyles();

  const processedData = isEmpty(data)
    ? DOMAINS
    : map(DOMAINS, domain => {
        forEach(data, (value, key) => {
          // eslint-disable-next-line no-param-reassign
          domain[key] = value[domain.subject];
        });
        return domain;
      });

  return (
    <div className={classes.radarContainer}>
      <RadarChart
        width={700}
        height={600}
        data={processedData}
        className={classNames({
          [classes.blur]: isEmpty(data),
        })}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        {map(data, (value, key) => {
          const myColor = value?.color || getRandomColor();
          return (
            <Radar
              key={key}
              name={key}
              dataKey={key}
              stroke={myColor}
              fill={myColor}
              fillOpacity={0.2}
            />
          );
        })}
      </RadarChart>
    </div>
  );
};
export default ReRadarChart;
