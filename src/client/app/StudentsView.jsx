import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import {getAllStudents} from './helpers/viewHelpers.js';
import StudentsList from './StudentsList.jsx';
import StudentResults from './StudentResults.jsx';
import css from '../css/nav.css';

class StudentsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      students: this.props.students,
      currentStudent: null
    };

    this.handleStudentsListEntryClick = this.handleStudentsListEntryClick.bind(this);
    console.log('In the students view', this.state.students);
  }

// --------------------------------------------------------------------
// Component Lifecycle Functions
// --------------------------------------------------------------------

  componentWillMount() {
    getAllStudents(1).then((res) => { 
      this.setState({
        students: Array(res.data[0].students[1])
      });
    });
  }
// --------------------------------------------------------------------


// --------------------------------------------------------------------
// Event Handlers
// --------------------------------------------------------------------

  handleStudentsListEntryClick(event) {
    this.setState({
      // currentStudent: event.target.id   THIS IS NOT WORKING - FIX IT LATER!
      currentStudent: true
    });
    // }, () => this.props.router.push('studentresults'));   SAME AS ABOVE
    console.log('this.state.students inside StudentView is: ', this.state.students);
    console.log('this.state.currentStudent inside StudentView is: ', this.state.currentStudent);
  // })
  }
// --------------------------------------------------------------------

  render() {
    // if (this.state.currentStudent === null) {
      return (
        <div>
          <h2>Students</h2>
          <StudentsList students={this.state.students}
                        currentStudentId={this.state.currentStudent}
                        handleStudentListEntryClick={this.handleStudentsListEntryClick} 
          />
        </div>
      );  
  //   } else {
  //     return (
  //       <div>
  //         <StudentResults />
  //       </div>
  //     );
  //   }
  }
}

export default StudentsView;
