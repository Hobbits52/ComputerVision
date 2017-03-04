import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import {getAllStudents} from './helpers/viewHelpers.js';
import StudentsList from './StudentsList.jsx';
import StudentTestList from './StudentTestList.jsx';
import css from '../css/nav.css';

class StudentsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      students: this.props.students,
      currentStudentName: null,
      currentId: null,
      currentCourse: null,
      currentCourseId: null
    };

    this.handleStudentsListEntryClick = this.handleStudentsListEntryClick.bind(this);
    this.handleGoBackStudents = this.handleGoBackStudents.bind(this);
  }

  handleStudentsListEntryClick(studentName, studentId, studentCourse, studentCourseId) {

    this.setState({
      currentStudentName: studentName,
      currentId: studentId,
      currentCourse: studentCourse,
      currentCourseId: studentCourseId
    });
  }

  handleGoBackStudents() {
    this.setState({
      currentStudentName: null,
      currentId: null,
      currentCourse: null,
      currentCourseId: null
    })
  }

  render() {
    if (this.state.currentStudentName === null) {
      return (
        <div>
          <h3 className="entryView">Students</h3>
          <StudentsList 
            students={this.state.students}
            currentStudentId={this.state.currentStudent}
            handleStudentsListEntryClick={this.handleStudentsListEntryClick} 
            handleGoBackStudents={this.handleGoBackStudents}
          />
        </div>
      );  
    } else {
      return (
        <div>
          <StudentTestList
            studentName={this.state.currentStudentName}
            studentId={this.state.currentId}
            currentCourse={this.state.currentCourse}
            currentCourseId={this.state.currentCourseId}
            handleGoBackStudents={this.handleGoBackStudents}
            />
        </div>
      );
    }
  }
}

export default StudentsView;
