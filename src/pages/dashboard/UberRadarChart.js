/* eslint-disable */
import React, { Component } from 'react';
import { RadarChart, CircularGridLines } from 'react-vis';

function ShowcaseButton(props) {
  const { buttonContent, onClick } = props;
  return (
    <button className="showcase-button" onClick={onClick}>
      {buttonContent}
    </button>
  );
}

const DATA = [
  {
    explosions: 7,
    wow: 10,
    dog: 8,
    sickMoves: 9,
    nice: 7,
  },
  {
    explosions: 1,
    wow: 7,
    dog: 3,
    sickMoves: 9,
    nice: 9,
  },
  {
    explosions: 7.1,
    wow: 11,
    dog: 16,
    sickMoves: 20,
    nice: 100,
  },
];

const DOMAIN = [
  { name: 'nice', domain: [0, 100], tickFormat: t => t },
  { name: 'explosions', domain: [6.9, 7.1] },
  { name: 'wow', domain: [0, 11] },
  { name: 'dog', domain: [0, 16] },
  { name: 'sickMoves', domain: [0, 20] },
];

function generateData() {
  return [
    Object.keys(DATA[0]).reduce((acc, key) => {
      acc[key] = DATA[0][key] + 5 * (Math.random() - 0.5);
      return acc;
    }, {}),
  ];
}

export default class AnimatedRadar extends Component {
  state = {
    data: DATA,
  };

  render() {
    const { data } = this.state;

    return (
      <div className="centered-and-flexed">
        <RadarChart
          animation
          data={data}
          domains={DOMAIN}
          style={{
            polygons: {
              fillOpacity: 0.25,
              strokeWidth: 2,
              strokeOpacity: 0.5,
            },
            labels: {
              textAnchor: 'middle',
            },
          }}
          margin={{
            left: 30,
            top: 30,
            bottom: 40,
            right: 50,
          }}
          tickFormat={t => ''}
          width={400}
          height={300}>
          <CircularGridLines
            style={{
              fill: 'white',
              fillOpacity: 0,
              backgroundColor: '#fff',
              stroke: '#ddd',
              strokeWidth: 1,
            }}
            tickValues={[...new Array(10)].map((v, i) => i / 10 - 1)}
          />
        </RadarChart>
        <ShowcaseButton
          onClick={() => this.setState({ data: generateData() })}
          buttonContent="UPDATE DATA"
        />
      </div>
    );
  }
}
