import React from 'react';
import {render} from 'react-dom';
import {Link, browserHistory} from 'react-router';
import {checkSession} from './helpers/authHelpers.js';
import NavSide from './Nav/NavSide.jsx';
import Login from './Login.jsx';
import css from '../css/nav.css';
import NavBar from './Nav/NavBar.jsx';
import { getAllTeachersClasses, getAllStudents } from './helpers/viewHelpers';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: this.props.isLoggedIn,
      teacher: this.props.teacher, 
      teacherId: this.props.teacherId,
      currentCourse: null,
      renderOk: false,

      students: null,
      classes: null,
      keys: 'An array of objects, each representing the data corresponding to a particular key.',
      mostRecentTest: 'An object representing the data of the most recent exam to fill the stats view'
    };

    this.addClass = this.addClass.bind(this);
    this.addKey = this.addKey.bind(this);
    this.addTest = this.addTest.bind(this);
    this.handlePostItClick = this.handlePostItClick.bind(this);
    this.handleSideBarClick = this.handleSideBarClick.bind(this);
    this.handleSearchBarClick = this.handleSearchBarClick.bind(this);
  }

  componentWillMount() {
    if (!this.props.isLoggedIn) {
      this.props.router.push('/login');
    }
  }

  componentDidMount() {
    getAllTeachersClasses()
    .then((res) => {
      this.setState({
        classes: res.data 
      });

      getAllStudents(this.state.teacherId)
        .then((res) => {
          this.setState({
            students: res.data,
            renderOk: true
          })

          console.log('RENDEROK', this.state.renderOk);
          console.log('THIS IS AN ARRAY WITH ALL THE STUDENTS', this.state.students);
        })
        .catch((err) => {
          console.log('Could not retrieve students', err);
        });
    })
    .catch((err) => {
      console.log('Could not retrieve classes', err);
    });
  }

  addClass() {
    console.log('Add new class');
  }

  addKey() {
    console.log('Add new ckey');
  }

  addTest() {
    console.log('Add new test');
  }

  handleSearchBarClick(currentStudentName) {
    // loop through students in each class
      // if student name matches a student name in this.state.students
        // sets states here and pass them down to student view
      // else 
        // show message, student does not exist
  }

  handlePostItClick(course) {
    this.setState({
      currentCourse: course
    })
  }

  handleSideBarClick() {
    this.setState({
      currentCourse: null
    })
  }

  render() {
    console.log('STUDENTS', this.state.students);
    if (this.state.classes === null && this.state.renderOk === false) {
      return (
        <div>
        </div>
      )
    } else {
      return (
        <div>
          <NavBar location={this.props.location} 
                  students={this.state.students} 
                  handleLogoutClick={this.props.handleLogoutClick} />
          <div className="container-fluid below-nav-top">
            <div className="row">
              <NavSide  className="navSide" 
                        teacher={this.state.teacher} 
                        handleSideBarClick={this.handleSideBarClick}
                        students={this.state.students}/>
                <div className="col-sm-10 teacherViewContainer">
                  {React.cloneElement(this.props.children, {
                      isLoggedIn: this.state.isLoggedIn,
                      teacher: this.state.teacher,
                      teacherId: this.state.teacherId,
                      students: this.state.students,
                      classes: this.state.classes,
                      keys: this.state.keys,
                      mostRecentTest: this.state.mostRecentTest,
                      addClass: this.addClass,
                      handlePostItClick: this.handlePostItClick,
                      currentCourse: this.state.currentCourse
                    })}
                </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Dashboard;




