import React from 'react';
import { Link, browserHistory } from 'react-router';
import Autosuggest from 'react-autosuggest';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: this.props.students,
      matches: [],
      decoratedStudents: [],
      suggestions: [],
      value: ''
    };
  };

  // converting the students to be an array of students, with the classId included.
  // must cycle through each class, and decorate each student object with the class ID

  // TODO: implement student search on navbar
  componentDidMount() {
    // console.log('yayyyyyyayayayay', this.props.students);
    // if (this.state.students) {
    //   console.log('in here');
    //   for (var i = 0; i < this.state.students.length; i++) {
    //     for (var j = 0; j < this.state.students[i].students; j++) {
    //       this.state.decoratedStudents.push({
    //         classId: this.state.students[i].class.ClassId,
    //         className: this.state.students[i].class.ClassName,
    //         studentId: this.state.students[i].students[j].StudentId,
    //         studentName: this.state.students[i].students[j].StudentName
    //       })
    //     }
    //   }
    // }
    // console.log('=======these are the decoratedStudents=======', this.state.decoratedStudents);
  }

  // onChange(event { newValue }) => {
  //   this.setState({
  //     value: newValue
  //   })
  // }

  // onSuggestionsFetchRequested({ value }) => {
  //   this.setState({
  //     suggestions: getSuggestions(value) //(implemented above)
  //   });
  // }

  // onSuggestionsClearRequested() => {
  //   this.setState({
  //     suggestions: []
  //   });
  // }


  render () {

    // const { value, suggestions } = this.state;

    // const inputProps = {
    //   placeholder: 'Search Students',
    //   value,
    //   onChange: this.onChange
    // };

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