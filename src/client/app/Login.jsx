import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import {login, logout} from './helpers/authHelpers.js';
import css from '../css/auth.css';
import NavBar from './Nav/NavBar.jsx';

class Login extends React.Component {
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
    // Call userLogin from authentication.js
    // if !loggedIn, alert user improper info
    // else,
    console.log('handling submit!');
    const user = {
      username: this.state.username,
      password: this.state.password
    };

    login(user)
    // here i am receiving a user with a user.username
    //
    // This is working...this is where you stopped
    .then((resp) => { console.log(resp.body);
                      this.props.handleLoginSubmit() })
    .catch((err) => { alert('You are not who you say you are.\n  Reconsider your identity.');
                      console.log('Login Error: ', err) });
  }

  //react-router has access to a location object as a view renders
  //setting the location prop to this object to that the NavBar can have access
  render() {
    return (
      <div>
        <NavBar location={this.props.location}/>
        <div className="login">
          <div>
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit} method="post">
            <label htmlFor="username"></label>
            <input id="username" name="username" type="text" value={this.state.username} onChange={this.handleInputChange} />
            <br/>
            <label htmlFor="password"></label>
            <input id="password" name="password" type="password" value={this.state.password} onChange={this.handleInputChange} />
            <br/>
            <input type="submit" value="Login" />
          </form>
          <Link className = "alreadyText" to="/signup">Not registered?  Create an Account &rarr;</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
