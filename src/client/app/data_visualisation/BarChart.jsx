import React from 'react';
import * as d3 from "d3";
import XAxis from './XAxis.jsx';
import Bar from './Bar.jsx';

import { processData, prepStudentAnswersForTest, responseFrequency, singleItemDifficulty, totalDifficulty } from './statisticsHelpers.js';

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionOfInterest: 6    // Need a click handler on each question in list that updates state to question clicked
    }
  }

  render() {
    let { top, right, bottom, left, currentClassId, currentClassName, gaussData, width, height, padding } = this.props;

    console.log('My input to prepStudentAnswersForTest is: ', gaussData);
    let studentAnswersForTest = prepStudentAnswersForTest(gaussData);
    console.log('studentAnswersForTest is: ', studentAnswersForTest);
    let respFreq = responseFrequency(studentAnswersForTest, this.state.questionOfInterest);  // Array of Objects
    console.log('respFreq is: ', respFreq);


    let q6Difficulty = singleItemDifficulty(gaussData, 1, respFreq, studentAnswersForTest, this.state.questionOfInterest);
    console.log('q6Difficulty is: ', q6Difficulty);

    const testDifficulty = function(allTestData, testId, studentAnswersForEntireTest) {
      var fullScoreForItem = 1;
      var sumSingleItems = 0;
      var totalPointsForTest = 28;
      console.log('studentAnswersForEntireTest: ', studentAnswersForEntireTest);
      
      for (var i = 1; i < studentAnswersForEntireTest[0].length; i++) {
        var respFreq2 = responseFrequency(studentAnswersForEntireTest, i);
        sumSingleItems += singleItemDifficulty(allTestData, testId, respFreq2, studentAnswersForEntireTest, i) * fullScoreForItem;
      }

      var totalDifficulty = (1 / totalPointsForTest) * sumSingleItems;

      return totalDifficulty;
    }

    console.log('gaussData: ', gaussData);
    console.log('1: ', 1);
    console.log('respFreq: ', respFreq);
    console.log('studentAnswersForTest: ', studentAnswersForTest);

    let wholeDifficulty = testDifficulty(gaussData, 1, studentAnswersForTest);
    console.log('wholeDifficulty: ', wholeDifficulty);





    let xScale = d3.scaleBand()
      .domain(["A", "B", "C", "D", "E"])  // Where data is read in..?..use x.domain(data.map(function(d) { return d.name; }));
      .rangeRound([0, width], .1)
      .paddingInner(0.2)
      .paddingOuter(0.2);

    let yScale = 
      d3.scaleLinear()
        .domain([0, d3.max(respFreq, (d) => d.value )])
        .range([height, 0]);

    console.log(yScale);
    let xAxis = d3.axisBottom(xScale).tickFormat((d) => d.x);
    let yAxis = d3.axisLeft(yScale);

    return (
      <div className="responseFrequency">
        <svg width={width + left + right} height={height + top + bottom}>
          <g transform={"translate(" + left + "," + top + ")"}>
            <XAxis className="axis" height={height} scale={xScale} numTicks={5}/>
            {respFreq.map((freq, index) => 
              <Bar binData={freq} 
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

BarChart.propTypes = {
  top: React.PropTypes.number,
  right: React.PropTypes.number,
  bottom: React.PropTypes.number,
  left: React.PropTypes.number,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  gaussData: React.PropTypes.object.isRequired
};

BarChart.defaultProps = {
  top: 20,
  right: 10,
  bottom: 30,
  left: 30
};

export default BarChart;
