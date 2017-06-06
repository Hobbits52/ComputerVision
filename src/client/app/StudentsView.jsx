import React from 'react';
import {browserHistory} from 'react-router';
import {getAllStudents} from './helpers/viewHelpers.js';

// components
import StudentsList from './StudentsList.jsx';
import StudentTestList from './StudentTestList.jsx';
import css from '../css/nav.css';

// Autosuggest module & search helper functions
import Autosuggest from 'react-autosuggest';
import {onSuggestionsClearRequested, 
        onSuggestionsFetchRequested,
        onChange,
        getSuggestionValue,
        getSuggestions} from './helpers/searchHelpers.js';
        

// Autosuggest uses css modules
const theme = {
  container: {
    display: 'block',
    margin: '0 auto'
  },
  suggestionsContainerOpen: {
      marginLeft: '-40px'
  },
  input: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '24px',
    alignText: 'center'
  }
}

class StudentsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      students: this.props.students,
      currentStudentName: null,
      currentId: null,
      currentCourse: null,
      currentCourseId: null,
      decoratedStudents: [],
      value: '',
      suggestions: []
    };

    this.handleStudentsListEntryClick = this.handleStudentsListEntryClick.bind(this);
    this.handleGoBackStudents = this.handleGoBackStudents.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);

    // search helper functions
    this.getSuggestions = getSuggestions.bind(this);
    this.getSuggestionValue = getSuggestionValue.bind(this);
    this.onChange = onChange.bind(this);
    this.onSuggestionsFetchRequested = onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = onSuggestionsClearRequested.bind(this);
  }

// --------------------------------------------------------------------
// Component Lifecycle Functions
// --------------------------------------------------------------------

  componentWillMount() {
    if(this.props.currentStudentName) {
      this.setState({
        currentStudentName: this.props.currentStudentName,
        currentId: this.props.currentId,
        currentCourse: this.props.currentCourse,
        currentCourseId: this.props.currentCourseId
      })
    }
  }

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

// --------------------------------------------------------------------

// --------------------------------------------------------------------
// Event Handlers
// --------------------------------------------------------------------

  handleStudentsListEntryClick(studentName, studentId, studentCourse, studentCourseId) {
    this.setState({
      currentStudentName: studentName,
      currentId: studentId,
      currentCourse: studentCourse,
      currentCourseId: studentCourseId
    });
  }

  handleGoBackStudents() {
    this.setState({
      currentStudentName: null,
      currentId: null,
      currentCourse: null,
      currentCourseId: null,
      value: '',
      suggestions: []
    })
  }

  renderSuggestion(suggestion) {
    return (
      <tr className = "suggestionResults" onClick={() => {
        this.handleStudentsListEntryClick(
          suggestion.studentName,
          suggestion.studentId,
          suggestion.className,
          suggestion.classId
          )}}>
        <td>{suggestion.studentId}</td>
        <td>{suggestion.studentName}</td>
        <td>{suggestion.className}</td>
      </tr>
    );
  }; 

// --------------------------------------------------------------------

  render() {

    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input element.
    const inputProps = {
      placeholder: 'Search students',
      value,
      onChange: this.onChange
    };

    if (this.state.suggestions.length > 0) {
      var StudentTestListClassName = "hideMe";
    } else {
      var StudentTestListClassName = "showMe";
    }

    if (this.state.currentStudentName === null) {
      return (
        <div>
          <h3 className="entryView">Students</h3>
          <div className="autoSuggestStudentsView">
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
          <div className={StudentTestListClassName}>
            <StudentsList 
              students={this.state.students}
              currentStudentId={this.state.currentStudent}
              handleStudentsListEntryClick={this.handleStudentsListEntryClick} 
              handleGoBackStudents={this.handleGoBackStudents}
            />
          </div>
        </div>
      );  
    } else {
      return (
        <div>
          <StudentTestList 
            studentName={this.state.currentStudentName}
            studentId={this.state.currentId}
            currentCourse={this.state.currentCourse}
            currentCourseId={this.state.currentCourseId}
            handleGoBackStudents={this.handleGoBackStudents}
            />
        </div>
      );
    }
  }
}

export default StudentsView;
