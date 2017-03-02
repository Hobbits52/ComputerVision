import React from 'react';
import ScatterPlot from './ScatterPlot.jsx';

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
// ----------------------------------------------------------------------------
class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: randomDataSet() 
    };
  }

  randomizeData() {
    this.setState({ data: randomDataSet() });
  }

  render() {
    return (
      <div>
        <h1>BIO 365: Cancer Biology - MidTerm 1</h1>
        <ScatterPlot {...props} {...styles} />
        <div className="controls">
          <button className="btn randomize" onClick={() => props.randomizeData()}>
            Randomize Data
          </button>
        </div>
      </div>
    );
  }
};

export default Chart