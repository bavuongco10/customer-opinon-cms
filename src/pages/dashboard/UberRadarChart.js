import React from 'react';
import { CircularGridLines, RadarChart } from 'react-vis';
import { constant, times } from 'lodash';

const DOMAINS = [
  { name: 'nhân viên', domain: [0, 100] },
  {
    name: 'phòng',
    domain: [0, 1],
  },
  { name: 'vệ sinh', domain: [0, 100] },
  { name: 'giá', domain: [0, 100] },
  { name: 'phòng tắm', domain: [0, 100] },
  { name: 'hồ bơi', domain: [0, 100] },
];

const AnimatedRadar = ({ data }) => (
  <div>
    <RadarChart
      animation
      data={data}
      domains={DOMAINS}
      style={{
        polygons: {
          fillOpacity: 0.25,
          strokeWidth: 1,
          strokeOpacity: 0.5,
        },
        labels: {
          textAnchor: 'middle',
        },
      }}
      margin={{
        top: 40,
        bottom: 40,
        left: 90,
        right: 90,
      }}
      tickFormat={constant('')}
      width={500}
      height={400}>
      <CircularGridLines
        style={{
          fill: 'white',
          fillOpacity: 0,
          backgroundColor: '#fff',
          stroke: '#ddd',
          strokeWidth: 1,
        }}
        tickValues={times(11, i => i / 10 - 1)}
      />
    </RadarChart>
  </div>
);

export default AnimatedRadar;
