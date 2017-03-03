import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import NavBar from './Nav/NavBar.jsx'
import NavSide from './Nav/NavSide.jsx'
import TeacherViewContainer from './TeacherViewContainer.jsx'
import HomeView from './HomeView.jsx'
import Login from './Login.jsx';
import css from '../css/main.css';

class ClassesView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentClass: 'Choose a class'
    };

    this.selectClass = this.selectClass.bind(this);
  }

// --------------------------------------------------------------------
// Component Lifecycle Functions
// --------------------------------------------------------------------

  componentDidMount() {

  }
// --------------------------------------------------------------------


// --------------------------------------------------------------------
// Event Handlers
// --------------------------------------------------------------------

  selectClass(event) {
    this.setState({
      currentClass: event.target.value
    });
  }
// --------------------------------------------------------------------

  render() {
    return (
      <div>
        <h2>{"Classes"}</h2>
        <form className="dropdown">
          <label>
            Select a class:
            <select value={this.state.currentClass} onChange={this.selectClass} >
              <option value={'Choose a class'}>{"Choose a class"}</option>
              {this.props.classes.map((course, key) => {
                return <option value={course.ClassName} key={key}>{course.ClassName}</option>
              })}
            </select>
          </label>
      </form>
      <h2 className="statisticsClassesDefault"> {"This is a placeholder for a graph representing grades from the class " + this.state.currentClass}</h2>
      </div>
    );
  }

}

export default ClassesView;
