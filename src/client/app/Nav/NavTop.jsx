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
    return(
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand navbar-left">
              <img className="logo" src={'../../public/pencil.png'} alt="Brand" />
            </Link>
            <Link to="/" className="navbar-brand navbar-left">
              <span>{"Teacher\'s Pet"}</span>
            </Link>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <form className="navbar-form navbar-left">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Search students" />
              </div>
              <button type="submit" className="btn btn-default">Submit</button>
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

export default NavTop;