import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import Chart from './data_visualisation/Chart.jsx';
import { processData } from './data_visualisation/statisticsHelpers.js';

class StatisticsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentClassId: 'Current Class Id',
      currentClassName: 'Current Class Name',
      classTestData: null,
      errorLoadingData: null
    };

    // this.handleSomeEvent = this.handleSomeEvent.bind(this);
  }

// --------------------------------------------------------------------
// Component Lifecycle Functions
// --------------------------------------------------------------------

  componentWillMount() {
    processData(1)
      .then((data) => {
        this.setState({
          classTestData: data
        });
      })
      .catch((error) => {
        this.setState({
          errorLoadingData: error.message
        })
      });
  }
// --------------------------------------------------------------------


// --------------------------------------------------------------------
// Event Handlers
// --------------------------------------------------------------------

  handleSomeEvent(someParameter) {

  }
// --------------------------------------------------------------------

  render() {
    return (
      <div>
        {!this.state.classTestData && !this.state.errorLoadingData && <p>Loading</p>}
        {this.state.errorLoadingData && <p>Error! {this.state.errorLoadingData}</p>}
        {this.state.classTestData && <Chart {...this.state} />}
      </div>
    )
  }

}

export default StatisticsView;
