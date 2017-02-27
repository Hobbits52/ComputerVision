import React from 'react';
import {render} from 'react-dom';
import {Link, browserHistory} from 'react-router';
import {checkSession} from './helpers/authHelpers.js';
import NavTop from './Nav/NavTop.jsx';
import NavSide from './Nav/NavSide.jsx';
import TeacherViewContainer from './TeacherViewContainer.jsx';
import Login from './Login.jsx';
import css from '../css/nav.css';

import NavBar from './Nav/NavBar.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // State variables to go here
      // isLoggedIn: this.props.isLoggedIn,
      isLoggedIn: true,
      user: null
    };

    // this.handleSomeEvent = this.handleSomeEvent.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  handleLoginSubmit() {
    // checkSession()
    // .then((res) => {
    //   this.setState({
    //     isLoggedIn: true
    //   });
    //   console.log('You did it!  Now you deserve to get food! :D');

  }

// --------------------------------------------------------------------
// Component Lifecycle Functions
// --------------------------------------------------------------------

  componentWillMount() {
    if (!this.props.isLoggedIn) {
      this.props.router.push('/login');
    }
  }
// --------------------------------------------------------------------


// --------------------------------------------------------------------
// Event Handlers
// --------------------------------------------------------------------

  handleSomeEvent(someParameter) {

  }
// --------------------------------------------------------------------

// <div className="construction">
//   <p>Under Construction!</p>
// </div>

    // helper.checkSession // This is an axios call from a helper file
  render() {
    return (
      <div>
        <NavBar location={this.props.location} />
        <div className="container-fluid below-nav-top">
          <div className="row">
            <NavSide className="navSide"/>
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

//{this.props.children}



