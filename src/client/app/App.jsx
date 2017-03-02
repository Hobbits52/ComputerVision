import React from 'react';
import {render} from 'react-dom';
import {Link, browserHistory} from 'react-router';
import {checkSession, logout} from './helpers/authHelpers.js';
import NavBar from './Nav/NavBar.jsx'
import NavSide from './Nav/NavSide.jsx'
import TeacherViewContainer from './TeacherViewContainer.jsx'
import Login from './Login.jsx';
import css from '../css/nav.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      user: null,
      // teacherId: null
    };

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick() {
    console.log("helloooooo");
    logout()
    .then((res) => {
      this.setState({
      isLoggedIn: false,
      user: null
      // teacherId: null
      }, () => this.props.router.push('/'))
    });
  };
  

  handleLoginSubmit(user) {
    this.setState({
      isLoggedIn: true,
      user: user //user is the username provided by successful login (user.username)
      // teacherId: user.data.teacherId
    }, () => this.props.router.push('/dashboard'));
  }

// --------------------------------------------------------------------
// Component Lifecycle Functions
// --------------------------------------------------------------------

  componentWillMount() {
    checkSession()
    .then((res) => {
      this.setState({
        isLoggedIn: true
      });
    })
    // Catch the error and then do nothing with it.
    .catch(err => { console.log('err: ', err); })
  }


// --------------------------------------------------------------------

  render() {
    return React.cloneElement(this.props.children, {
      isLoggedIn: this.state.isLoggedIn,
      handleLoginSubmit: this.handleLoginSubmit,
      handleLogoutClick: this.handleLogoutClick,
      user: this.state.user 
      // teacherId: this.state.teacherId
    });
  }
}

export default App;

