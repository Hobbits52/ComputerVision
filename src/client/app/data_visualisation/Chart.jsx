import React from 'react';
import ScatterPlot from './ScatterPlot.jsx';
import Histogram from './Histogram.jsx';
import css from '../../css/scatterplot.css';

// ----------------------------------------------------------------------------
// Everything in here can me moved to another file!
// ----------------------------------------------------------------------------

const styles = {
  width   : 500,
  height  : 300,
  padding : 30,
};

// Number of data points for the chart
const numDataPoints = 50;

// Returns a random number from 0 to 1000
const randomNum = () => Math.floor(Math.random() * 1000);

// Creates an array of 50 elements of (x, y) coordinates 
const randomDataSet = () => {
  return Array.apply(null, {length: numDataPoints}).map(() => [randomNum(), randomNum()]);
}

// Returns a pair of random gaussian numbers
const randomGaussNum = (mu, sigma) => {
  // Generate pair of independent random uniformly distributed variables
  // within interval (0,1).
  let u1 = Math.random();
  let u2 = Math.random();

  // Transform u1 and u2 to independent random variables with a standard 
  // normal distribution.
  let z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  let z1 = Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2);

  // Transform standard normal deviate, z0, to a value within a normal
  // distribution with mean, mu, and standard deviation, sigma.
  return z0 * sigma + mu;
}

// Creates an array of random normally distrubted test scores with mean, mu,
// and standard deviation, sigma.
const randomGaussDataSet = (mu, sigma) => {
  console.log('From CHART: ', Array.apply(null, {length: numDataPoints}).map(() => randomGaussNum(mu, sigma)));
  return Array.apply(null, {length: numDataPoints}).map(() => randomGaussNum(mu, sigma));
}
// ----------------------------------------------------------------------------


class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: randomDataSet(),
      currentClassId: this.props.currentClassId,
      currentClassName: this.props.currentClassName,
      gaussData: this.props.classTestData
    };
  }

  randomizeData() {
    this.setState({ data: randomDataSet() });
  }

  render() {
    return (
      <div>
        <h1>{this.props.currentClassName} - MidTerm 1</h1>
        <ScatterPlot {...this.state} {...styles} />
        <Histogram {...this.state} {...styles} />
        <div className="controls">
          <button className="btn randomize" onClick={() => this.randomizeData()}>
            Randomize Data
          </button>
        </div>
      </div>
    );
  }
};

export default Chart