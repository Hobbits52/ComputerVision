import React from 'react';
import {Link, browserHistory} from 'react-router';
import {checkSession} from './helpers/authHelpers.js';
import { getAllTeachersClasses, getAllStudents } from './helpers/viewHelpers';

// components
import NavSide from './Nav/NavSide.jsx';
import Login from './Login.jsx';
import css from '../css/nav.css';
import NavBar from './Nav/NavBar.jsx';
import Spinner from './Spinner.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCourse: null,
      currentStudentName: null,
      currentId: null,
      currentCourseId: null,
      students: null,
      classes: null,

      // placeholders for future features
      keys: 'An array of objects, each representing the data corresponding to a particular key.',
      mostRecentTest: 'An object representing the data of the most recent exam to fill the stats view'

    };

    this.handlePostItClick = this.handlePostItClick.bind(this);
    this.handleSideBarClick = this.handleSideBarClick.bind(this);
    this.handleSearchBarClick = this.handleSearchBarClick.bind(this);
  }

// --------------------------------------------------------------------
// Component Lifecycle Functions
// --------------------------------------------------------------------

  componentWillMount() {
    if (!this.props.isLoggedIn) {
      this.props.router.push('/login');
    }
  }

  // ajax calls should happen in componentDidMount() 
  // https://daveceddia.com/ajax-requests-in-react/
  componentDidMount() {
    getAllTeachersClasses()
    .then((res) => {
      this.setState({
        classes: res.data 
      });

      getAllStudents(this.props.teacherId)
        .then((res) => {
          this.setState({
            students: res.data
          })
        })
        .catch((err) => {
          console.log('Could not retrieve students', err);
        });
    })
    .catch((err) => {
      console.log('Could not retrieve classes', err);
    });
  }

// --------------------------------------------------------------------

// --------------------------------------------------------------------
// Event Handlers
// --------------------------------------------------------------------

  handleSearchBarClick(studentName, studentId, className, classId) {
    this.setState({
      currentStudentName: studentName,
      currentId: studentId,
      currentCourse: className,
      currentCourseId: classId
    });
  }

  handlePostItClick(course, courseId) {
    this.setState({
      currentCourse: course,
      currentCourseId: courseId
    })
  }

  handleSideBarClick() {
    this.setState({
      currentCourse: null,
      currentStudentName: null,
      currentId: null,
      currentCourseId: null
    })
  }

// --------------------------------------------------------------------

  render() {

    // loading spinner      
    if (this.state.classes === null || this.state.students === null) {
      return (
        <Spinner />
      )
    } else {
      return (
        <div>
          <NavBar location={this.props.location} 
                  students={this.state.students} 
                  handleLogoutClick={this.props.handleLogoutClick}
                  handleSearchBarClick={this.handleSearchBarClick} />
          <div className="container-fluid below-nav-top">
            <div className="row">
              <NavSide  className="navSide" 
                        teacher={this.props.teacher} 
                        handleSideBarClick={this.handleSideBarClick}
                        students={this.state.students}/>
                <div className="col-sm-10 teacherViewContainer">
                  {React.cloneElement(this.props.children, {
                      isLoggedIn: this.props.isLoggedIn,
                      teacher: this.props.teacher,
                      teacherId: this.props.teacherId,
                      students: this.state.students,
                      classes: this.state.classes,
                      keys: this.state.keys,
                      mostRecentTest: this.state.mostRecentTest,
                      addClass: this.addClass,
                      handlePostItClick: this.handlePostItClick,
                      currentCourse: this.state.currentCourse,
                      currentStudentName: this.state.currentStudentName,
                      currentId: this.state.currentId,
                      currentCourseId: this.state.currentCourseId
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




