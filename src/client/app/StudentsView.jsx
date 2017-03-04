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
      currentCourse: null
    };

    this.handleStudentsListEntryClick = this.handleStudentsListEntryClick.bind(this);
  }

  componentWillMount() {
  }

  handleStudentsListEntryClick(studentName, studentId, studentCourse ) {
    console.log('STUDENT NAME', studentName);
    console.log('STUDENT ID', studentId);
    console.log('STUDENT COURSE', studentCourse);

    this.setState({
      currentStudent: studentName,
      currentId: studentId,
      currentCourse: studentCourse
    });
  }

  render() {
    console.log('This is this.props.students', this.props.students);
    if (this.state.currentStudentName === null) {
      return (
        <div>
          <h2>Students</h2>
          <StudentsList students={this.state.students}
                        currentStudentId={this.state.currentStudent}
                        handleStudentsListEntryClick={this.handleStudentsListEntryClick} 
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
            />
        </div>
      );
    }
  }
}

export default StudentsView;
