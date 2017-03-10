import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import {getAllStudents} from './helpers/viewHelpers.js';
import StudentsList from './StudentsList.jsx';
import StudentTestList from './StudentTestList.jsx';
import css from '../css/nav.css';
import Autosuggest from 'react-autosuggest';
// import {getSuggestions, getSuggestionValue, renderSuggestion} from './helpers/authHelpers.js';

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
    this.getSuggestions = this.getSuggestions.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
  }

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

  /////////////////SEARCH FEATURE/////////////////////


  getSuggestions(value, students) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : students.filter(val =>
      val.studentName.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  getSuggestionValue(suggestion) {
    suggestion.studentName;
  };

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
