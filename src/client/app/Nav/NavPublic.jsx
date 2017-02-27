//TODO: Refactor to one nav bar with logic paired with this.props.location.pathname

import React from 'react';
import { Link, browserHistory } from 'react-router';

class NavPublic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  };

  render () {
    console.log('This is the current page:', this.props.location.pathname);
    return(
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand navbar-left">
              <img className="logo" src={'../../assets/pencil.png'} alt="Brand" />
            </Link>
            <Link to="/" className="navbar-brand navbar-left">
              <span>{"teacher\'s pet"}</span>
            </Link>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav signUpArea navbar-right">
              <li><Link to="/login">Login</Link></li>
              <li className="signupButton"><Link to="/signup">Signup</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}


export default NavPublic;