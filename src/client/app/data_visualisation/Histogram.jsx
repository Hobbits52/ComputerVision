import React from 'react';
import * as d3 from "d3";
import XAxis from './XAxis.jsx';
import YAxis from './YAxis.jsx';
import HistoBar from './HistoBar.jsx';

import { processData, prepStudentAnswersForTest, responseFrequency } from './statisticsHelpers.js';

class Histogram extends React.Component {

  render() {
    let { top, right, bottom, left, currentClassId, currentClassName, gaussData, width, height, padding } = this.props;

    console.log('Im Gaussian!: ', gaussData);

    let xScale = 
      d3.scaleLinear()
        .domain([0, 100])         // d3.max(gaussData) instead of 100
        .rangeRound([0, width]);

    let histogramGenerator = (data) => 
      d3.histogram()
        .domain(xScale.domain())
        .thresholds(xScale.ticks(20))
        (data);

    let histogramData = histogramGenerator(gaussData[0].studentTestScores);
    // console.log('From Histogram, this is histogramData: ', histogramData);

    let yScale = 
      d3.scaleLinear()
        .domain([0, d3.max(histogramData, (d) => d.length )])
        .range([height, 0]);

    return (
      <div className="react-d3-histogram">
        <svg width={width + left + right} height={height + top + bottom}>
          <g transform={"translate(" + left + "," + top + ")"}>
            <XAxis className="axis" height={height} scale={xScale} numTicks={20}/>
            {histogramData.map((bin, index) => 
              <HistoBar binData={bin} 
                        xScale={xScale} 
                        yScale={yScale}
                        height={height} 
                        key={index}
              />
            )}
          </g>
        </svg>
      </div>
    );
  }
}

Histogram.propTypes = {
  top: React.PropTypes.number,
  right: React.PropTypes.number,
  bottom: React.PropTypes.number,
  left: React.PropTypes.number,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  gaussData: React.PropTypes.object.isRequired
};

Histogram.defaultProps = {
  top: 20,
  right: 10,
  bottom: 30,
  left: 30
};

export default Histogram;
