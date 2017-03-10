import React from 'react';
import * as d3 from "d3";
import XAxis from './XAxis.jsx';
import Bar from './Bar.jsx';

import { processData, prepStudentAnswersForTest, responseFrequency, singleItemDifficulty, totalDifficulty, mean, stdDev } from './statisticsHelpers.js';

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


    const pointBiSerial = function(allTestData, testId, studentAnswersForEntireTest, questionOfInterest) {
      var correctChoice = allTestData[testId - 1].correctAnswers[questionOfInterest - 1][0];

      var Mp = allTestData[testId - 1].studentTestResults.filter(function(item, index) {
        if(index===1) {console.log('item: ', item);}
        return item.studentAnswers[questionOfInterest - 1][0] === correctChoice;
      }).map(function(studentTestResult) {
        return studentTestResult.studentScore;
      });

      var MpReal = d3.sum(Mp)/Mp.length;
      // console.log('MpReal: ', MpReal);

      var Mq = allTestData[testId - 1].studentTestResults.filter(function(item) {
        return item.studentAnswers[questionOfInterest - 1][0] !== correctChoice;
      }).map(function(studentTestResult) {
        return studentTestResult.studentScore;
      });

      var MqReal = d3.sum(Mq)/Mq.length;
      // console.log('MqReal: ', MqReal);

      var stdev = d3.deviation(allTestData[testId - 1].studentTestScores);
      // console.log('stdev: ', stdev);
      var p = Mp.length / (Mp.length + Mq.length);
      var q = Mq.length / (Mp.length + Mq.length);
      return ((MpReal - MqReal) / stdev) * Math.sqrt(p * q)
    }

    let PBS = pointBiSerial(gaussData, 1, studentAnswersForTest, 6);
    console.log('PBS: ', PBS);


    const topBottom27 = function(allTestData, testId, questionOfInterest) {
      var correctChoice = allTestData[testId - 1].correctAnswers[questionOfInterest - 1][0];

      var results;

      // Find score that qualifies student for top 27%
      console.log('allTestData[testId - 1].studentTestScores: ', allTestData[testId - 1].studentTestScores.sort(function(a, b) {
        return Number(a) - Number(b);
      }).reverse());
      
      var studentsRanked = allTestData[testId - 1].studentTestScores.sort(function(a, b) {
        return Number(a) - Number(b);
      }).reverse();
      
      var top27TestScore = studentsRanked[Math.ceil(0.27 * studentsRanked.length)];
      console.log('top27TestScore: ', top27TestScore);
      // results.top27AvgTestScore = top27TestScore;

      var bottom27TestScore = studentsRanked[Math.ceil((1 - 0.27) * studentsRanked.length)];
      console.log('bottom27TestScore: ', bottom27TestScore);
      // results.bottom27AvgTestScore = bottom27TestScore;

      // Filter for only studentTestResults whos .studentScore is in top 27%
      var top27ScoreOnQuestion = allTestData[testId - 1].studentTestResults.filter(function(item) {
        return item.studentScore >= top27TestScore;
      }).map(function(studentTestResult) {
        if(studentTestResult.studentAnswers[questionOfInterest - 1][0] === correctChoice) {
          return 1;
        } else {
          return 0;
        }
      });

      var Ph = d3.mean(top27ScoreOnQuestion);

      // Filter for only studentTestResults whos .studentScore is in bottom 27%
      var bottom27ScoreOnQuestion = allTestData[testId - 1].studentTestResults.filter(function(item) {
        return item.studentScore >= bottom27TestScore;
      }).map(function(studentTestResult) {
        if(studentTestResult.studentAnswers[questionOfInterest - 1][0] === correctChoice) {
          return 1;
        } else {
          return 0;
        }
      });

      var Pl = d3.mean(bottom27ScoreOnQuestion);

      var discriminationIndex = (Ph*100 - Pl*100) / 100;
      console.log('ds', discriminationIndex);


      let top27AnswerSets = allTestData[testId - 1].studentTestResults.filter(function(item) {
        return item.studentScore >= top27TestScore;
      }).map(function(studentTestResult) {
        return studentTestResult.studentAnswers;
      });

      console.log('----',top27AnswerSets);

      let top27RespFreq = responseFrequency(top27AnswerSets, questionOfInterest);
      console.log('top27RespFreq', top27RespFreq);

      results = {top27AvgScoreOnQuestion: Ph,
                 bottom27AvgScoreOnQuestion: Pl,
                 top27RespFreq: 0,
                 bottom27RespFreq: 0,
                 discriminationIndex: discriminationIndex}

      console.log('ASFASDASDASD: ', results);
      return results;

    }

    topBottom27(gaussData, 1, 6);

    return (
      <div className="responseFrequency">
        <center>
          <h4>Class Average:  {Math.floor(mean(gaussData[0].studentTestScores))}</h4>
          <h4>Standard Deviation: {Math.floor(stdDev(gaussData[0].studentTestScores))} </h4>
          <h4>Difficulty Index:  {wholeDifficulty}</h4>
        </center>
        <br/>
        <br/>
        <center>
          <h2>Example: Single Question Analysis</h2>
          <h3>Frequency Distribution - Question 6</h3>
        </center>
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
        <center>
          <h4>{'Answer Choice Frequency Distribution:'}</h4>
          <h4>{'A: 3.2%  B: 2.2%  C: 88.6%  D: 3.1%  E: 2.9%'}</h4>
        </center>
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


