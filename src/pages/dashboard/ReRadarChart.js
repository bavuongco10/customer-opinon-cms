/* eslint-disable */
import React from 'react';
import { isEmpty, map, forEach } from 'lodash';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Legend,
  PolarRadiusAxis,
} from 'recharts';

const DOMAINS = [
  {
    subject: 'nhân viên',
    fullMark: 100,
  },
  {
    subject: 'phòng',
    fullMark: 100,
  },
  {
    subject: 'vệ sinh',
    fullMark: 100,
  },
  {
    subject: 'giá',
    fullMark: 100,
  },
  {
    subject: 'phòng tắm',
    fullMark: 100,
  },
  {
    subject: 'hồ bơi',
    fullMark: 100,
  },
];

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const ReRadarChart = ({ data }) => {
  const processedData = isEmpty(data)
    ? DOMAINS
    : map(DOMAINS, domain => {
        forEach(data, (value, key) => {
          domain[key] = value[domain.subject];
        });
        return domain;
      });

  return (
    <RadarChart width={500} height={400} data={processedData}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis angle={30} domain={[0, 100]} />
      {map(data, (value, key) => {
        const myColor = getRandomColor();
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
      {/* <Legend /> */}
    </RadarChart>
  );
};
export default ReRadarChart;
