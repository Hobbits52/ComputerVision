import React from 'react';
import {render} from 'react-dom';
import {Link, browserHistory} from 'react-router';
import {checkSession} from './helpers/authHelpers.js';
import NavSide from './Nav/NavSide.jsx';
import TeacherViewContainer from './TeacherViewContainer.jsx';
import Login from './Login.jsx';
import css from '../css/nav.css';
import NavBar from './Nav/NavBar.jsx';
import { getAllTeachersClasses } from './helpers/viewHelpers';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: this.props.isLoggedIn,
      user: this.props.user, 

      latestTest: 'Pull tests with latest key', //key uploaded, needs the createdAt and updatedAt properties
      teacherId: 1,
      teacher: this.props.user,
      students: 'An array of objects, each representing an individual students data.',
      classes: 'An array of objects, each representing the data of an individual class.',
      keys: 'An array of objects, each representing the data corresponding to a particular key.',
      mostRecentTest: 'An object representing the data of the most recent exam to fill the stats view'
    };
  }

// --------------------------------------------------------------------
// Component Lifecycle Functions
// --------------------------------------------------------------------

  componentWillMount() {
    console.log('This is the current state in Dashboard', this.state.isLoggedIn);
    if (!this.props.isLoggedIn) {
      this.props.router.push('/login');
    }
  }
// --------------------------------------------------------------------


// --------------------------------------------------------------------
// Event Handlers
// --------------------------------------------------------------------

  // Get classes for post it classes
  // 

  handleSomeEvent(someParameter) {

  }
// --------------------------------------------------------------------

  render() {
    console.log('handle click within dashboard', this.props.handleLogoutClick);
    return (
      <div>
        <NavBar location={this.props.location} handleLogoutClick={this.props.handleLogoutClick} />
        <div className="container-fluid below-nav-top">
          <div className="row">
            <NavSide className="navSide" user={this.state.user} />
            <TeacherViewContainer>
              {this.props.children}
            </TeacherViewContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;




