import React from 'react';
import { Link, browserHistory } from 'react-router';
import Autosuggest from 'react-autosuggest';
import StudentsView from '../StudentsView.jsx'

// Autosuggest uses css modules
const theme = {
  suggestionsContainerOpen: {
    display: 'block',
    color: '#434343',
    position: 'absolute',
    top: 51,
    width: 257,
    left: 258,
    backgroundColor: '#fff',
    fontWeight: 300,
    fontSize: 16,
    zIndex: 2,
    borderRadius: '0 0 4px 4px'
  },
  inputFocused: {
    outline: 'none'
  },
  inputOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  suggestionsList: {
    padding: '10px',
    listStyleType: 'none'
  },
  suggestionHighlighted: {
    backgroundColor: '#ddd'
  }
}

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: this.props.students,
      matches: [],
      decoratedStudents: [],
      suggestions: [],
      value: '',
    };

    this.getSuggestions = this.getSuggestions.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.clearSelection = this.clearSelection.bind(this);
  };

  componentDidMount() {
    if (this.state.students) {
      for (var i = 0; i < this.state.students.length; i++) {
        for (var j = 0; j < this.state.students[i].students.length; j++) {
          this.state.decoratedStudents.push({
            classId: this.state.students[i].class.ClassId,
            className: this.state.students[i].class.ClassName,
            studentId: this.state.students[i].students[j].StudentId,
            studentName: this.state.students[i].students[j].StudentName
          })
        }
      }
    }
  }


  /////////////////SEARCH FEATURE/////////////////////


  getSuggestions(value, students) {
    if (value) {
      const inputValue = value.trim().toLowerCase();
      const inputLength = inputValue.length;

      return inputLength === 0 ? [] : students.filter(val =>
        val.studentName.toLowerCase().slice(0, inputLength) === inputValue
      );
    }
  };

  getSuggestionValue(suggestion) {
    suggestion.studentName;
  };

  clearSelection() {
    this.setState({
      suggestions: [],
      value: ''
    })
  }

  renderSuggestion(suggestion) {
    return (
      <div className="searchBarList" onClick={() => {
            this.props.handleSearchBarClick(
              suggestion.studentName,
              suggestion.studentId,
              suggestion.className,
              suggestion.classId
              )
            this.clearSelection();
          }}>
        <Link to= "/dashboard/students/" >
            <h5>{suggestion.studentName}</h5>
        </Link> 
      </div>
    );
  }; 

  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value, this.state.decoratedStudents)
    });
  };

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  };

  ///////////////////////////////////////


  render () {

    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input element.
    const inputProps = {
      placeholder: 'Search students',
      value,
      onChange: this.onChange
    };

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
            <div className="searchBarListContainer">
              <Autosuggest 
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
                theme={theme}
              />
            </div>
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