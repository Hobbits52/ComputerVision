import React from 'react';
import {browserHistory} from 'react-router';
import css from '../css/nav.css';

// components
import StudentsListEntry from './StudentsListEntry.jsx';

class StudentsList extends React.Component {
  
  render() {
    let data = [];
    this.props.students.map((obj) => {

      for (var i = 0; i < obj.students.length; i++) {
        var studentObj = {
          courseName: obj.class.ClassName,
          courseId: obj.class.ClassId
        }
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
                return <StudentsListEntry 
                    student={pupil}
                    currentStudent={this.props.currentStudent}
                    handleStudentsListEntryClick={this.props.handleStudentsListEntryClick}
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
