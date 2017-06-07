import React from 'react';
import { Link, browserHistory } from 'react-router';

// Autosuggest module & search helper functions
import Autosuggest from 'react-autosuggest';
import {onSuggestionsClearRequested, 
        onSuggestionsFetchRequested,
        onChange,
        getSuggestionValue,
        getSuggestions,
        clearSelection} from '../helpers/searchHelpers.js';
        

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
      matches: [],
      decoratedStudents: [],
      suggestions: [],
      value: '',
    };

    this.renderSuggestion = this.renderSuggestion.bind(this);

    // search helper functions
    this.onChange = onChange.bind(this);
    this.getSuggestions = getSuggestions.bind(this);
    this.getSuggestionValue = getSuggestionValue.bind(this);
    this.onSuggestionsFetchRequested = onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = onSuggestionsClearRequested.bind(this);
    this.clearSelection = clearSelection.bind(this);

    console.log(this.props.students);
  };

// --------------------------------------------------------------------
// Component Lifecycle Functions
// --------------------------------------------------------------------

  componentDidMount() {
    if (this.props.students) {
      for (var i = 0; i < this.props.students.length; i++) {
        for (var j = 0; j < this.props.students[i].students.length; j++) {
          this.state.decoratedStudents.push({
            classId: this.props.students[i].class.ClassId,
            className: this.props.students[i].class.ClassName,
            studentId: this.props.students[i].students[j].StudentId,
            studentName: this.props.students[i].students[j].StudentName
          })
        }
      }
    }
  }

// --------------------------------------------------------------------


// --------------------------------------------------------------------
// Event Handlers
// --------------------------------------------------------------------

  renderSuggestion(suggestion) {
    console.log('YOU CLICKED ME YAY');
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

// --------------------------------------------------------------------

  render () {

    /////////////////SEARCH FEATURE/////////////////////

    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input element.
    const inputProps = {
      placeholder: 'Search students',
      value,
      onChange: this.onChange
    };

    ///////////////////////////////////////////////////


    // this.props.location is set in each component that contains a navbar
    let publicPages = this.props.location.pathname === '/' ||
                      this.props.location.pathname === '/signup' ||
                      this.props.location.pathname === '/login';
   
    let classNameLocation, farRightLinkTo, farRightLinkClass, farRightText, redirect, home;

    if (publicPages) {
      // adding the classname publicPages if splash page, signup, and login
      // the classnames determine what is turned on and what is turned off
      classNameLocation = "navbar navbar-default navbar-static-top publicPages";
      farRightLinkTo = "/signup";
      farRightLinkClass = "signupButton";
      farRightText = "Signup";
      home = "/"
    } else {
      // adding the classname dashboardPages if any other routes
      classNameLocation = "navbar navbar-default navbar-static-top dashboardPages";
      farRightLinkTo = "#";
      farRightLinkClass = "logoutButton";
      farRightText = "Logout";
      home="/dashboard/"
    }

    return (
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