import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import css from '../css/auth.css';

import TestTakerList from './TestTakerList.jsx';

class TestResults extends React.Component {
  render() {
    return (
      <div className="testResults">
        <h1>{this.props.TestTitle}</h1>
        <TestTakerList testTitle={this.props.testTitle}
                       testTakers={this.props.testTakers}
                       handleTestTakerClick={this.props.handleTestTakerClick}
        />
        {this.props.children}
      </div>  
    );
  }
}

export default TestResults;
