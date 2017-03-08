import React from 'react';
import { Link, browserHistory } from 'react-router';
import Autosuggest from 'react-autosuggest';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: []
    };
  };


  render () {
    //this.props.location is set in each component that contains a navbar
    let publicPages = this.props.location.pathname === '/' ||
                      this.props.location.pathname === '/signup' ||
                      this.props.location.pathname === '/login';

    let classNameLocation, farRightLinkTo, farRightLinkClass, farRightText, redirect, home;

    if (publicPages) {
      //adding the classname publicPages if splash page, signup, and login
      //the classnames determine what is turned on and what is turned off
      classNameLocation = "navbar navbar-default navbar-static-top publicPages";
      farRightLinkTo = "/signup";
      farRightLinkClass = "signupButton";
      farRightText = "Signup";
      home = "/"
    } else {
      //adding the classname dashboardPages if any other routes
      classNameLocation = "navbar navbar-default navbar-static-top dashboardPages";
      farRightLinkTo = "#";
      farRightLinkClass = "logoutButton";
      farRightText = "Logout";
      home="/dashboard/"
    }

    //fix logic for new onClick. needs to work for signup
    return(
      <nav className={classNameLocation}>
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand navbar-left">
              <img className="logo" src={'../../assets/pencil.png'} alt="Brand" />
            </Link>
            <Link to={home} className="navbar-brand navbar-left">
              <span>{"teacher\'s pet"}</span>
            </Link>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <form className="navbar-form navbar-left">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Search students" />
              </div>
              <button type="submit" className="btn btn-default">
                <img className="search" src={'../../../assets/search.png'} alt="Search" />
              </button>
            </form>
            <ul className="nav navbar-nav signUpArea navbar-right">
              <li className="loginLink"><Link to="/login">Login</Link></li>
              <li className={farRightLinkClass} onClick={this.props.handleLogoutClick}>
                <Link to={farRightLinkTo}>{farRightText}</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;