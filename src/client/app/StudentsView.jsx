import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import {getAllStudents} from './helpers/viewHelpers.js';
import StudentsList from './StudentsList.jsx';
import css from '../css/nav.css';

class StudentsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // State variables to go here
      students: [{id: 1, name: 'Anthony Pecchillo', class: 'BIO-101'},
                 {id: 1, name: 'Anthony Pecchillo', class: 'BIO-101'},
                 {id: 1, name: 'Anthony Pecchillo', class: 'BIO-101'},
                 {id: 1, name: 'Anthony Pecchillo', class: 'BIO-101'}],
      currenteStudent: null
    };

    this.handleStudentsListEntryClick = this.handleStudentsListEntryClick.bind(this);
  }

// --------------------------------------------------------------------
// Component Lifecycle Functions
// --------------------------------------------------------------------

  componentWillMount() {
    // getAllStudents().then((res) => {
    //   this.setState({
    //     students: res.data
    //   });
    // });
  }
// --------------------------------------------------------------------


// --------------------------------------------------------------------
// Event Handlers
// --------------------------------------------------------------------

  handleStudentsListEntryClick(event) {
      console.log('You clicked a StudentListEntry!');
      console.log('sdfasdf', event.target);
      this.setState({
        currentStudent: event.target.id
      }, () => this.props.router.push('/dashboard'));
      console.log('this.state.students inside StudentView is: ', this.state.students);
      console.log('this.state.currentStudent inside StudentView is: ', this.state.currentStudent);
    // })
  }
// --------------------------------------------------------------------

  render() {
    return (
      <div className="innerViews">
        <h3>Students</h3>
        <StudentsList students={this.state.students}
                      currentStudentId={this.state.currentStudent}
                      handleStudentListEntryClick={this.handleStudentsListEntryClick}
        />
      </div>
    );
  }
}

export default StudentsView;
