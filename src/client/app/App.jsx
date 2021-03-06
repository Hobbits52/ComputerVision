import React from 'react';
import {Link, browserHistory} from 'react-router';
import {checkSession, logout} from './helpers/authHelpers.js';
import css from '../css/nav.css';

// components
import NavBar from './Nav/NavBar.jsx'
import NavSide from './Nav/NavSide.jsx'
import TeacherViewContainer from './TeacherViewContainer.jsx'
import Login from './Login.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      teacher: null,
      teacherId: null
    };

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
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
    .catch(err => { console.log('err: ', err); })
  }

// --------------------------------------------------------------------


// --------------------------------------------------------------------
// Event Handlers
// --------------------------------------------------------------------

  handleLogoutClick() {
    logout()
    .then((res) => {
      this.setState({
      isLoggedIn: false,
      teacher: null
      }, () => this.props.router.push('/'));
    });
  };
  
  handleLoginSubmit(teacher) {
    this.setState({
      isLoggedIn: true,
      teacher: teacher.username,
      teacherId: teacher.id
    }, () => this.props.router.push('/dashboard'));
  }

// --------------------------------------------------------------------

  render() {
    return React.cloneElement(this.props.children, {
      isLoggedIn: this.state.isLoggedIn,
      handleLoginSubmit: this.handleLoginSubmit,
      handleLogoutClick: this.handleLogoutClick,
      teacher: this.state.teacher, 
      teacherId: this.state.teacherId
    });
  }
}

export default App;

