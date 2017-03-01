import React from 'react';
import {render} from 'react-dom';
import {Link, browserHistory} from 'react-router';
import {checkSession} from './helpers/authHelpers.js';
import NavBar from './Nav/NavBar.jsx'
import NavSide from './Nav/NavSide.jsx'
import TeacherViewContainer from './TeacherViewContainer.jsx'
import Login from './Login.jsx';
import css from '../css/nav.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // State variables to go here
      isLoggedIn: false,
      user: null
    };

    // this.handleSomeEvent = this.handleSomeEvent.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  handleLoginSubmit() {
    this.setState({
      isLoggedIn: true
    }, () => this.props.router.push('/dashboard'));
  }

// --------------------------------------------------------------------
// Component Lifecycle Functions
// --------------------------------------------------------------------

  componentWillMount() {
    checkSession()
    .then((res) => {
      console.log('res is: ', res);
      this.setState({
        isLoggedIn: true
      });
      console.log('You did it!  Now you deserve to get food! :D');
    })
    // Catch the error and then do nothing with it.
    .catch(err => { console.log('err: ', err); })
  }
  componentDidMount() {

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
    return React.cloneElement(this.props.children, {
      isLoggedIn: this.state.isLoggedIn,
      handleLoginSubmit: this.handleLoginSubmit
    });
  }
}

export default App;

//{this.props.children}
