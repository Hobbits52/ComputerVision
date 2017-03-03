import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import StudentsListEntry from './StudentsListEntry.jsx';
import css from '../css/nav.css';

class StudentsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      students: this.props.students
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

    // re-format data for data list
    let data = [];
    this.state.students.map((obj) => {
      var studentObj = {courseName: obj.class.ClassName}
      for (var i = 0; i < obj.students.length; i++) {
        studentObj['StudentId'] = obj.students[i].StudentId;
        studentObj['StudentName'] = obj.students[i].StudentName;
        data.push(studentObj);
      }
    });

    
      return (
        <div>
          <table>
            <tbody>
              {data.map((pupil, index) => {
                console.log('This is one student entry', pupil);
                  return <StudentsListEntry student={pupil}
                                     currentStudent={this.props.currentStudent}
                                     handleStudentListEntryClick={this.props.handleStudentListEntryClick}
                                     key={index}
                  />
                })
              }
            </tbody>
          </table>
        </div>
      );


  }

}

export default StudentsList;
