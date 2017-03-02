import React from 'react';
import {render} from 'react-dom';
import {Link, browserHistory} from 'react-router';
import {checkSession} from './helpers/authHelpers.js';
import NavSide from './Nav/NavSide.jsx';
import Login from './Login.jsx';
import css from '../css/nav.css';
import NavBar from './Nav/NavBar.jsx';
import { getAllTeachersClasses } from './helpers/viewHelpers';


class Dashboard extends React.Component {
  constructor(props) {
    //major state is stored within here
    super(props);

    this.state = {
      isLoggedIn: this.props.isLoggedIn,
      user: this.props.user, 
      teacherId: 5, //this.props.teacherId

      students: 'An array of objects, each representing an individual students data.',
      classes: 'An array of objects, each representing the data of an individual class.',
      keys: 'An array of objects, each representing the data corresponding to a particular key.',
      mostRecentTest: 'An object representing the data of the most recent exam to fill the stats view'
    };

    this.addClass = this.addClass.bind(this);
    this.addKey = this.addKey.bind(this);
    this.addTest = this.addTest.bind(this);
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
      console.log('======= LINE 44 ========', res);
      this.setState({
        classes: res.body // confirm 
      });
    })
    .catch((err) => {
      console.log('Could not retrieve classes', err);
    })
  }


// --------------------------------------------------------------------
  

// --------------------------------------------------------------------
// Event Handlers
// --------------------------------------------------------------------

  addClass() {
    console.log('Add new class');
  }

  addKey() {
    console.log('Add new class');
  }

  addTest() {
    console.log('Add new class');
  }


// --------------------------------------------------------------------

  render() {
    console.log('handle click within dashboard', this.props.handleLogoutClick);
    return (
      <div>
        <NavBar location={this.props.location} students={this.state.students} handleLogoutClick={this.props.handleLogoutClick} />
        <div className="container-fluid below-nav-top">
          <div className="row">
            <NavSide className="navSide" user={this.state.user} />
              <div className="col-sm-10 teacherViewContainer">
                {React.cloneElement(this.props.children, {
                    isLoggedIn: this.state.isLoggedIn,
                    user: this.state.user,
                    teacherId: this.state.teacherId,
                    students: this.state.students,
                    classes: this.state.classes,
                    keys: this.state.keys,
                    mostRecentTest: this.state.mostRecentTest,
                    addClass: this.addClass
                  })}
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;




