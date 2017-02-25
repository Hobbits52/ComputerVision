//TODO: Refactor to one nav bar with logic paired with this.props.location.pathname

import React from 'react';
import { Link } from 'react-router';
import { logout } from '../helpers/authHelpers.js';



class NavTop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: '',
      teacher: 'An object with the logged in teacher\'s info.  Picture, Name, etc.',
      searchInput: ''
    };

    // Bind all methods to this context before passing down to components.
    this.searchStudent = this.searchStudent.bind(this);
    this.findStudent = this.findStudent.bind(this);
    this.logOut = this.logOut.bind(this);
  };

  // ----------------------------------------------
  // Component Lifecycle Functions
  // ----------------------------------------------
  // shouldComponentUpdate(nextState) {
  //   if (this.props.studentObj !== nextState) {
  //     return true;
  //   }
  //   return false;
  // }

  // ----------------------------------------------
  // Axios calls
  // ----------------------------------------------
  searchStudent(event) {
    this.props.handleSearchStudent(event.target.value);
  };

  findStudent(event) {
    console.log(event);
    this.props.handleClickedStudent(event);
  }

  logOut() {
    logout()
    .then(resp => { console.log('logged out'); })
    .catch(err => { console.log(err); });
  };

  render () {
    // const isHomePage = this.props.location.pathname === '/login' || this.props.location.pathname === '/signup';
    // if (isHomePage) {
    //   let defineClassname = "navbar navbar-default navbar-static-top showLoginSignup";
    // } else {
    //   let defineClassname = "navbar navbar-default navbar-static-top showSearchBarLogout";
    // }

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
            <form className="navbar-form navbar-left">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Search students" />
              </div>
              <button type="submit" className="btn btn-default">
                <img className="search" src={'../../../assets/search.png'} alt="Search" />
              </button>
            </form>
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="#">Logout</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

//
export default NavTop;