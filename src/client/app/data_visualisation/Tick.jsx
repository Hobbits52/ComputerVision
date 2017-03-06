import React from 'react';
import * as d3 from "d3";

class Tick extends React.Component {

  render() {
    let { value, scale } = this.props;
    let textStyle = { textAnchor: "middle" };

    return (
      <g className="axis" transform={"translate(" + scale(value) + ",0)"}>
        <line x2="0" y2="6"></line>
        <text dy=".71em" y="9" x="0" style={textStyle}>{value}</text>
      </g>
    );
  }
}

Tick.propTypes = {
  value: React.PropTypes.number.isRequired,
  scale: React.PropTypes.func.isRequired
}

export default Tick;