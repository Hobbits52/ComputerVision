import React from 'react';
import {render} from 'react-dom';
import {Link, browserHistory} from 'react-router';
import css from '../css/nav.css';

class StudentsListEntry extends React.Component {

  render() {
    return (
      <tr name={this.props.student.StudentName} onClick={() => {
        this.props.handleStudentsListEntryClick(
          this.props.student.StudentName,
          this.props.student.StudentId,
          this.props.student.courseName,
          this.props.student.courseId
          )}}>
        <td>{this.props.student.StudentId.toString(4)}</td>
        <td>{this.props.student.StudentName}</td>
        <td>{this.props.student.courseName}</td>
      </tr>
    );
  }
}

export default StudentsListEntry;
