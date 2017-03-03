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
    //major state is stored within here
    super(props);

    this.state = {
      isLoggedIn: this.props.isLoggedIn,
      teacher: this.props.teacher, 
      teacherId: this.props.teacherId,
      currentCourse: null,

      students: 'An array of objects, each representing an individual students data.',
      classes: null,
      keys: 'An array of objects, each representing the data corresponding to a particular key.',
      mostRecentTest: 'An object representing the data of the most recent exam to fill the stats view'
    };

    this.addClass = this.addClass.bind(this);
    this.addKey = this.addKey.bind(this);
    this.addTest = this.addTest.bind(this);
    this.handlePostItClick = this.handlePostItClick.bind(this);
    this.handleSideBarClick = this.handleSideBarClick.bind(this);
  }

// --------------------------------------------------------------------
// Component Lifecycle Functions
// --------------------------------------------------------------------

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
          console.log('this is the res object', res.data);
          this.setState({
            students: res.data
          })

          console.log('THESE ARE ALL THE STUDENTS', this.state.students);
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

  addClass() {
    console.log('Add new class');
  }

  addKey() {
    console.log('Add new ckey');
  }

  addTest() {
    console.log('Add new test');
  }

  handlePostItClick(course) {
    console.log('why is this firing', course);
    this.setState({
      currentCourse: course
    })
  }

  handleSideBarClick() {
    this.setState({
      currentCourse: null
    })
  }


// --------------------------------------------------------------------

  render() {
    if (this.state.classes === null) {
      return (
        <div>
        </div>
      )
    } else {
      return (
        <div>
          <NavBar location={this.props.location} students={this.state.students} handleLogoutClick={this.props.handleLogoutClick} />
          <div className="container-fluid below-nav-top">
            <div className="row">
              <NavSide className="navSide" teacher={this.state.teacher} handleSideBarClick={this.handleSideBarClick}/>
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




