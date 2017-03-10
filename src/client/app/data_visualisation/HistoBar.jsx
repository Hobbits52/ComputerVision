import React from 'react';
import * as d3 from "d3";

class Bar extends React.Component {

  render() {
    let { binData, xScale, yScale, height } = this.props;
    // console.log('From Bar, binData is: ', binData);

    let scaledX = xScale(binData.x0);
    let scaledY = yScale(binData.length);
    let scaledDx = xScale(binData.x1 - binData.x0);

    return (
      <g className="axis" transform={"translate(" + scaledX + "," + scaledY + ")"}>
        <rect width={scaledDx} height={height - scaledY} />
        <text dy="0.85em" y="6" x={scaledDx / 2} textAnchor="middle">{}</text>
      </g>
    );
  }
}

Bar.propTypes = {
  binData: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  xScale: React.PropTypes.func.isRequired,
  yScale: React.PropTypes.func.isRequired,
  height: React.PropTypes.number.isRequired
};


export default Bar;
