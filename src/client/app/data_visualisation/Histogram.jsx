import React from 'react';
import * as d3 from "d3";
import DataCircles from './DataCircles.jsx';
import XYAxis from './XYAxis.jsx';


// const marshalProps = (props) => {
//   const scales = { xScale: xScale(props), yScale: yScale(props) };   // To Marshall Data:  To massage it into a useable form.
//   return Object.assign({}, props, scales);                           //   Origin:  Ancient Greek Data Scientist, SoSmartOcles 
// };
// ----------------------------------------------------------------------------

const Histogram = d3.histogram().domain([0,1]).thresholds(19);
  // const d3Props = marshalProps(props);
  return ( 
    <svg width={d3Props.width} height={d3Props.height}>
    </svg>
  );
}

export default Histogram;

var histGenerator = d3.histogram()
  .domain([0,1])    // Set the domain to cover the entire intervall [0;]
  .thresholds(19);  // number of thresholds; this will create 19+1 bins

const bins = histGenerator(this.props.gaussData);
console.log(bins);