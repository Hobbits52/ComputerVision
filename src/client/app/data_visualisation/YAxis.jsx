import React from 'react';
import * as d3 from "d3";
import Tick from "./Tick.jsx";
import Path from "./Path.jsx";

class YAxis extends React.Component {

  render() {
    let { height, padding, scale } = this.props;

    let ticks = scale.ticks(20).map(function(tick, index) {
      console.log(index);
      return (
        <Tick value={tick} 
              scale={scale} 
              key={index} 
        />
      );
    });

    return (
      <g className="axis" transform={`translate(${padding}, 0)`} orient={d3.axisLeft()}>
        <Path scale={scale} />
        <g>{ticks}</g>
      </g>
    );
  }
}

YAxis.propTypes = {
  height: React.PropTypes.number.isRequired,
  scale: React.PropTypes.func.isRequired
};

export default YAxis;