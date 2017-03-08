import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import StudentTestListItem from './StudentTestListItem.jsx';
import {getAllTestsInClass} from './helpers/viewHelpers.js';
import StudentResults from './StudentResults.jsx';

class StudentTestList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStudentName: this.props.studentName,
      currentCourseId: this.props.currentCourseId,
      classes: null,
      returnTests: null,
      currentTest: null
    };

    this.handleUserSelectTest = this.handleUserSelectTest.bind(this);
    this.handleGoBackTestList = this.handleGoBackTestList.bind(this);
  }

  // this will change, answers will come back in a diff form
  componentWillMount() {
    getAllTestsInClass(this.state.currentCourseId)
    .then((res) => {
      this.setState({
        classes: res.data
      });

      let allStudentTests = [];

      //for now, assume that a student is not in more than one class with the same teacher
      for (var i = 0; i < this.state.classes.length; i++) {
        for (var j = 0; j < this.state.classes[i].students.length; j++) {
          if (this.props.studentId === this.state.classes[i].students[j].StudentId) {
            allStudentTests = this.state.classes[i].students[j].tests;
            break;
          }
        }
      }

      this.setState({
        returnTests: allStudentTests
      });

    })
  }

  handleUserSelectTest(test) {
    this.setState({
      currentTest: test
    });
  }

  handleGoBackTestList() {
    this.setState({
      currentTest: null
    });
  }

  render() {
    if (this.state.returnTests !== null && this.state.currentTest === null) {
      return (
        <div>
          <h5 className="backCrumb" onClick={this.props.handleGoBackStudents}>{"< Back to Students"}</h5>
          <h3>{this.state.currentStudentName + "'s Tests"}</h3>
          <table>
            <tbody>
              <tr>
                <th>Class</th>
                <th>Test Name</th>
                <th>Student Score</th>
              </tr>
                {this.state.returnTests.map((test, index) => {
                  return <StudentTestListItem 
                            test={test}
                            studentName={this.props.currentStudentName}
                            studentId={this.props.currentId}
                            currentCourse={this.props.currentCourse}
                            currentCourseId={this.props.currentCourseId}
                            key={index}
                            handleUserSelectTest={this.handleUserSelectTest}
                            classes={this.state.classes}
                                     
                  />
                })
              }
            </tbody>
          </table>
        </div>
      ); 
    } 
    if (this.state.returnTests === null) {
      return (
        <div>
        </div>
      );
    }

    if (this.state.currentTest !== null) {
      return (
        <div>
          <StudentResults 
            test={this.state.currentTest} 
            studentName={this.state.currentStudentName}
            handleGoBackTestList={this.handleGoBackTestList}
            currentCourseId={this.state.currentCourseId}
          />
        </div>
      );
    }
  }
}

export default StudentTestList;