import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import StudentTestListItem from './StudentTestListItem.jsx';
import {getAllTestsInClass} from './helpers/viewHelpers.js';

class StudentTestList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // State variables to go here
      currentCourseId: this.props.currentCourseId,
      tests: null,
      returnTests: null
    };
  }

  componentWillMount() {
    getAllTestsInClass(this.state.currentCourseId)
    .then((res) => {
      console.log('here is the res', res);
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

  render() {
    if (this.state.returnTests !== null) {
      return (
        <div>
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
                                     
                  />
                })
              }
            </tbody>
          </table>
        </div>
      ); 
    } else {
      return (
        <div>
        </div>
      );
    }
  }
}

export default StudentTestList;