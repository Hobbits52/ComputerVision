import React from 'react';
import {browserHistory, Link} from 'react-router';
import axios from 'axios';
import {login, logout, signup} from './helpers/authHelpers.js';
import css from '../css/auth.css';

// components
import NavBar from './Nav/NavBar.jsx';

class Signup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: 'Full Name',
      password: 'password'
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
    };

    signup(user)
    .then((resp) => { browserHistory.push('/login'); })
    .catch((err) => { console.log('Error while attempting to create an account: ', err); });
  }

  // TODO: add another field to signup 'full name'

  render() {
    return (
      <div>
        <NavBar location={this.props.location}/>
        <div className="signup">
          <div>
            <h1>Sign Up</h1>
            <form onSubmit={this.handleSubmit} method="post">
              <input id="username" name="username" type="text" value={this.state.username} onChange={this.handleInputChange} />
              <br/>
              <input id="password" name="password" type="password" value={this.state.password} onChange={this.handleInputChange} />
              <br/>
              <input type="submit" value="Sign Up" />
            </form>
            <Link className="alreadyText" to="/login">Already registered?  Login &rarr;</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;