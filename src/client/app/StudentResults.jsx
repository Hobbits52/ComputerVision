import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import css from '../css/auth.css';
import { getKeysForClass } from './helpers/viewHelpers.js';

// setting a key with the index is an anti-pattern
// https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318
// used to generate a unique key for react mapped components
import shortid from 'shortid';

// components
import StudentResultsItem from './StudentResultsItem.jsx';

class StudentResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStudentName: this.props.studentName,
      currentCourseName: null,
      answers: null,
      test: JSON.parse(this.props.test.studentAnswers),
      result: this.props.test.result
    };
  }

// --------------------------------------------------------------------
// Component Lifecycle Functions
// --------------------------------------------------------------------

  // ajax calls should happen in componentDidMount() 
  // https://daveceddia.com/ajax-requests-in-react/
  componentDidMount() {
    getKeysForClass(this.props.currentCourseId)
    .then((res) => {
      var singleAnswerJSON = '';
      for (var i = 0; i < res.data.answerkey.length; i++) {
        if (this.props.test.answerKeyId === res.data.answerkey[i].keyId) {
          singleAnswerJSON = res.data.answerkey[i].answers;
          break;
        }
      }
      this.setState({
        answers: JSON.parse(singleAnswerJSON),
        currentCourseName: res.data.classname
      })
    })
  }

// --------------------------------------------------------------------

  render() {
    var result = this.state.result * 100 + "%"
    if (this.state.answers !== null && this.state.test !== null) {
      return (
        <div className="studentResults">
          <h5 className = "backCrumb" onClick={this.props.handleGoBackTestList}>{"< Back to " + this.state.currentStudentName + "'s tests"}</h5>
          <h3>{this.state.currentStudentName + "'s Results: " + result}</h3>
          <h3>{this.state.currentCourseName + " Test"}</h3>
          <table>
            <thead>
              <tr>
                <th>Question #</th>
                <th>Student Answer</th>
                <th>Correct Answer</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(this.state.test).map((answer, key) => {
                return <StudentResultsItem 
                  testNum={key + 1} 
                  studentAnswer={this.state.test[key + 1]} 
                  keyAnswer={this.state.answers[key + 1]} 
                  key={shortid.generate()} />
              })}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div>
        </div>
      )
    }
  }
}

export default StudentResults;
