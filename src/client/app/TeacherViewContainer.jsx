import React, { cloneElement } from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import css from '../css/auth.css';

import HomeView from './HomeView.jsx';
import StudentsView from './StudentsView.jsx';


class TeacherViewContainer extends React.Component {

  render() {
    return (
      <div className="col-sm-10 teacherViewContainer">
        {React.cloneElement(this.props.children, {
                teacher: this.props.teacher,
                students: this.props.students,
                classes: this.props.classes,
                keys: this.props.keys,
                mostRecentTest: this.props.mostRecentTest,
                handleSearchInputChange: this.handleSearchInputChange,
                handleSearchSubmit: this.handleSearchSubmit,
                handleSidebarClick: this.handleSidebarClick
              })}
      </div>  
    );
  }
  
}

export default TeacherViewContainer;


