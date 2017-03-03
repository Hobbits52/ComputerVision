import React from 'react';
import {render} from 'react-dom';
import {Link, browserHistory} from 'react-router';
import css from '../css/nav.css';

///not getting here

class StudentsListEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // State variables to go here
    };
    console.log('in student list entry', this.props.student);
    // this.handleSomeEvent = this.handleSomeEvent.bind(this);
  }

// --------------------------------------------------------------------
// Component Lifecycle Functions
// --------------------------------------------------------------------

  componentDidMount() {

  }
// --------------------------------------------------------------------


// --------------------------------------------------------------------
// Event Handlers
// --------------------------------------------------------------------

  handleSomeEvent(someParameter) {

  }
// --------------------------------------------------------------------

  render() {
    console.log('in list entry', this.props.student);
    return (
      <tr onClick={this.props.handleStudentListEntryClick}>
        <td>{this.props.student.StudentId}</td>
        <td>{this.props.student.StudentName}</td>
        <td>{"Biology 101"}</td>
      </tr>
    );
  }
}

export default StudentsListEntry;
