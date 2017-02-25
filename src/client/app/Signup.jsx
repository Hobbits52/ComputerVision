import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import {login, logout, signup} from './helpers/authHelpers.js';
import css from '../css/auth.css';

import NavPublic from './Nav/NavPublic.jsx';

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
    .then((resp) => { console.log('Account created!'); })
    .catch((err) => { console.log('Error while attempting to create an account: ', err); });
  }

  render() {
    return (
      <div>
        <NavPublic />
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
            <Link className="alreadyText" to="/signup">Already registered?  Login &rarr;</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;