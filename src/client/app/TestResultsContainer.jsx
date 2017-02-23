import React, { cloneElement } from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import css from '../css/auth.css';

import TestTakerList from './TestTakerList.jsx';

class TestResultsContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      testTitle: 'React 101 - MidTerm 1: Passing Props',
      testTakers: [{name: 'Kevin Gin', choices: 'A%B%C%D%E'}, 
                   {name: 'Cynthia Bathgate', choices: 'E%B%D%D%A'}, 
                   {name: 'Benze Gong', choices: 'D%C%C%D%C'}, 
                   {name: 'Anthony Pecchillo', choices: 'D%B%E%A%A'}]
    };  
    this.props.params.tesTakers = this.state.testTakers;
    console.log(this.props.params.tesTakers);

    this.handleTestTakerClick = this.handleTestTakerClick.bind(this);
  }

  handleTestTakerClick(event) {
    // What happens when the teacher clicks an individual student's exam from the list?
  }

  render() {
    return (
      <div className="testResultsContainer">        
        {React.cloneElement(this.props.children, {
          testTitle: this.state.testTitle,
          testTakers: this.state.testTakers,
          handleTestTakerClick: this.handleTestTakerClick
        })}
      </div>  
    );
  }
}

export default TestResultsContainer;
