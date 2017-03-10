import React, { cloneElement } from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import css from '../css/auth.css';

import HomeView from './HomeView.jsx';
import StudentsView from './StudentsView.jsx';


class TeacherViewContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    };

    // this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    // this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    // this.handleSidebarClick = this.handleSidebarClick.bind(this);
  }

  handleSearchInputChange(event) {
    event.preventDefault();
    // What happens when the teacher changes the text in the search bar?
  }

  handleSearchSubmit(event) {
    event.preventDefault();
    // What happens when the teacher submits a search in the search bar?
  }

  handleSidebarClick(event) {
    // What happens when the teacher clicks an individual student's exam from the list?
  }

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


