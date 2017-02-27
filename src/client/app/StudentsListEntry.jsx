import React from 'react';
import {render} from 'react-dom';
import {Link, browserHistory} from 'react-router';
import css from '../css/nav.css';

class StudentsListEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // State variables to go here
    };

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
    return (
      <tr onClick={this.props.handleStudentListEntryClick}>
        <td>{this.props.student.id}</td>
        <td>{this.props.student.name}</td>
        <td>{this.props.student.class}</td>
      </tr>
    );
  }
}

export default StudentsListEntry;
