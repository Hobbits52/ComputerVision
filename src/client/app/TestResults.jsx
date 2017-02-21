import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import css from '../css/auth.css';

import TestTakerList from './TestTakerList.jsx';

class TestResults extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      testTitle: 'React 101 - MidTerm 1: Passing Props',
      testTakers: [{name: 'Kevin Gin', choices: 'A%B%C%D%E'}, 
                   {name: 'Cynthia Bathgate', choices: 'E%B%D%D%A'}, 
                   {name: 'Benze Gong', choices: 'D%C%C%D%C'}, 
                   {name: 'Anthony Pecchillo', choices: 'D%B%E%A%A'}]
    };  

    this.handleTestTakerClick = this.handleTestTakerClick.bind(this);
  }

  handleTestTakerClick(event) {
    // What happens when the teacher clicks an individual student's exam from the list?
  }

  render() {
    return (
      <div className="login">
        <h1>{this.state.TestTitle}</h1>
        <TestTakerList testTitle={this.state.testTitle}
                       testTakers={this.state.testTakers}
                       handleTestTakerClick={this.handleTestTakerClick}
        />
      </div>  
    );
  }
}

export default TestResults;
