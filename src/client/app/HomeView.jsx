import React, { cloneElement } from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import css from '../css/main.css';
import PostIt from './PostIts.jsx';

import {getAllTeachersClasses} from './helpers/viewHelpers.js';


class HomeView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };

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
      <div className="col-sm-10 mainContent">
        <h3>My Classes</h3>
          <div className="postIts">
            {this.props.classes.map((course, key) => {
              return <PostIt class={course} key={key} handlePostItClick={this.props.handlePostItClick}/>
            })}
          </div>
        <h3>Most Recent Test Results</h3>
        <div className="testTitle">
          <div className="titleText">
            <h4>Test Title</h4>
          </div>
          <img className="graphFake"src="../assets/graph-sample.jpg"></img>
        </div>
      </div>
    );
  }
}

export default HomeView;

        // {React.cloneElement(this.props.children, {
        //   teacher: this.state.teacher,
        //   students: this.state.students,
        //   classes: this.state.classes,
        //   keys: this.state.keys,
        //   mostRecentTest: this.state.mostRecentTest,
        //   handleSearchInputChange: this.handleSearchInputChange,
        //   handleSearchSubmit: this.handleSearchSubmit,
        //   handleSidebarClick: this.handleSidebarClick
        // })}
        //
