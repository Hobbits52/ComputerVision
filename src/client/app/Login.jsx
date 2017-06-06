import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import {login, logout} from './helpers/authHelpers.js';
import css from '../css/auth.css';

// components
import NavBar from './Nav/NavBar.jsx';

class Login extends React.Component {
  constructor(props) {
    super(props)

    // Username and password for demo
    this.state = {
      username: 'Professor X',
      password: 'password'
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

// --------------------------------------------------------------------
// Event Handlers
// --------------------------------------------------------------------

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const teacher = {
      username: this.state.username,
      password: this.state.password
    };

    axios({
      method: 'POST',
      url: 'auth/login',
      data: teacher
    })
    .then((res) => {
      // save token to Global
      window.localStorage.token = res.data.token;
      this.props.handleLoginSubmit(res.data.user); 
    }) 
    .catch((err) => { 
      // TODO: don't be alert message
      alert('You are not who you say you are.\n  Reconsider your identity.');
      console.log('Login Error: ', err); 
    });
  }

// --------------------------------------------------------------------

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
