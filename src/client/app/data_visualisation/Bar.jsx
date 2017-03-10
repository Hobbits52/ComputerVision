import React from 'react';
import * as d3 from "d3";

class Bar extends React.Component {

  render() {
    let { binData, xScale, yScale, height } = this.props;
    console.log('From Bar, freq is: ', binData);

    let scaledX = xScale(binData.name);
    let scaledY = yScale(binData.value);
    let scaledDx = xScale.bandwidth();
    console.log('scaledX is: ', xScale.bandwidth());

    return (
      <g className="axis" transform={"translate(" + scaledX + "," + scaledY + ")"}>
        <rect width={scaledDx} height={height - scaledY} />
        <text dy="-0.85em" y="6" x={scaledDx / 2} textAnchor="middle">{binData.name}</text>
      </g>
    );
  }
}

Bar.propTypes = {
  binData: React.PropTypes.object.isRequired,
  xScale: React.PropTypes.func.isRequired,
  yScale: React.PropTypes.func.isRequired,
  height: React.PropTypes.number.isRequired
};


export default Bar;
