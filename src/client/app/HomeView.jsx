import React, { cloneElement } from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import css from '../css/main.css';


class HomeView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      teacher: 'An object with the logged in teacher\'s info.  Picture, Name, etc.',
      students: 'An array of objects, each representing an individual students data.',
      classes: 'An array of objects, each representing the data of an individual class.',
      keys: 'An array of objects, each representing the data corresponding to a particular key.',
      mostRecentTest: 'An object representing the data of the most recent exam to fill the stats view',
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

  //
  render() {
    return (
      <div className="col-sm-10 mainContent">
        <h3>To-Do List</h3>
          <div className="postIts">
            <div className="postImage">
              <img className="background-image" src={'../public/post-it.png'}/>
              <h5> - help joe with midterm prep</h5>
            </div>
            <div className="postImage">
              <img className="background-image" src={'../public/post-it.png'}/>
              <h5> - parent teacher conference for sally</h5>
            </div>
            <div className="postImage">
              <img className="background-image" src={'../public/post-it.png'}/>
              <h5> - make midterm key</h5>
            </div>
          </div>
        <h3>Most Recent Test Results</h3>
        <div className="testTitle">
          <div className="titleText">
            <h4>Test Title</h4>
          </div>
          <img className="graphFake"src="../public/graph-sample.jpg"></img>
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
