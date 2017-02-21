import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import {login, logout} from './helpers/authHelpers.js';
import css from '../css/auth.css';

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''    
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

    login(user)
    .then((resp) => { console.log('logged in'); })
    .catch((err) => { console.log('could not login', err); });
  }

  render() {
    return (
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit} method="post">
          <label htmlFor="username">Username:</label>
          <input id="username" name="username" type="text" value={this.state.username} onChange={this.handleInputChange} />
          <br/>
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" value={this.state.password} onChange={this.handleInputChange} />
          <br/>
          <input type="submit" value="Login" />
        </form>
        <Link to="/signup">Not registered?  Create an Account &rarr;</Link>
      </div>  
    );
  }
}

export default Login;
