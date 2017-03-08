import React from 'react';
import * as d3 from "d3";
import Tick from "./Tick.jsx";
import Path from "./Path.jsx";

class XAxis extends React.Component {

  render() {
    let { height, scale } = this.props;

    let ticks = scale.ticks(20).map(function(tick, index) {
      return (
        <Tick value={tick} 
              scale={scale} 
              key={index} 
        />
      );
    });

    return (
      <g className="axis" transform={"translate(0," + height + ")"}>
        <Path scale={scale} />
        <g>{ticks}</g>
      </g>
    );
  }
}

XAxis.propTypes = {
  height: React.PropTypes.number.isRequired,
  scale: React.PropTypes.func.isRequired
};

export default XAxis;