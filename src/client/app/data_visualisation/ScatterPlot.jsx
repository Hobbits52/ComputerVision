import React from 'react';
import * as d3 from "d3";
import DataCircles from './DataCircles.jsx';
import XYAxis from './XYAxis.jsx';

// ----------------------------------------------------------------------------
// This can be included inside the ScatterPlot class as a method?
// 
// Or, it can be placed inside another file?
// ----------------------------------------------------------------------------
const xMax = (data)  => d3.max(data, (d) => d[0]);
const yMax = (data)  => d3.max(data, (d) => d[1]);

const xScale = (props) => {
  return d3.scaleLinear()
    .domain([0, xMax(props.data)])
    .range([props.padding, props.width - props.padding * 2]);
};

const yScale = (props) => {
  return d3.scaleLinear()
    .domain([0, yMax(props.data)])
    .range([props.height - props.padding, props.padding]);
};

const marshalProps = (props) => {
  const scales = { xScale: xScale(props), yScale: yScale(props) };   // To Marshall Data:  To massage it into a useable form.
  return Object.assign({}, props, scales);                           //   Origin:  Ancient Greek Data Scientist, SoSmartOcles 
};
// ----------------------------------------------------------------------------

const ScatterPlot = (props) => {
  const d3Props = marshalProps(props);
  return ( 
    <svg width={d3Props.width} height={d3Props.height}>
      <DataCircles {...d3Props}/>
      <XYAxis {...d3Props}/>
    </svg>
  );
}

export default ScatterPlot;
