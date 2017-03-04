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
      tests: null,
      returnTests: null,
      currentTest: null
    };

    this.handleUserSelectTest = this.handleUserSelectTest.bind(this);
    this.handleGoBackTestList = this.handleGoBackTestList.bind(this);
  }

  componentWillMount() {
    getAllTestsInClass(this.state.currentCourseId)
    .then((res) => {
      this.setState({
        tests: res.data
      });

      let allStudentTests = [];
      for (var i = 0; i < this.state.tests[0].students.length; i++) {
        if (this.props.studentId === this.state.tests[0].students[i].StudentId) {
          allStudentTests.push(this.state.tests[0].students[i].tests);
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
    })
  }

  handleGoBackTestList() {
    console.log('helloooooo', this.state.currentStudentName);
    this.setState({
      currentTest: null
    })
  }

  render() {
    if (this.state.returnTests !== null && this.state.currentTest === null) {
      return (
        <div>
          <h5 className="backCrumb" onClick={this.props.handleGoBackStudents}>{"< Back to Students"}</h5>
          <h3>{this.state.currentStudentName + "'s Tests"}</h3>
          <table>
            <tbody>
                {this.state.returnTests.map((test, index) => {
                  return <StudentTestListItem 
                            test={test}
                            studentName={this.props.currentStudentName}
                            studentId={this.props.currentId}
                            currentCourse={this.props.currentCourse}
                            currentCourseId={this.props.currentCourseId}
                            key={index}
                            handleUserSelectTest={this.handleUserSelectTest}
                                     
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
          />
        </div>
      );
    }
  }
}

export default StudentTestList;