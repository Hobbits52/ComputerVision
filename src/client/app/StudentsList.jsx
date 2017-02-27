import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import StudentsListEntry from './StudentsListEntry.jsx';
import css from '../css/nav.css';

class StudentsList extends React.Component {
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
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Class</th>
            </tr>
          </thead>
          <tbody>
            {this.props.students.map((student, index) =>
              <StudentsListEntry student={student}
                                 currentStudent={this.props.currentStudent}
                                 handleStudentListEntryClick={this.props.handleStudentListEntryClick}
                                 key={index}
              />
            )}
          </tbody>
        </table>
      </div>
    );
  }

}

export default StudentsList;
