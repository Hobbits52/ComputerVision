import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import NavBar from './Nav/NavBar.jsx'
import NavSide from './Nav/NavSide.jsx'
import TeacherViewContainer from './TeacherViewContainer.jsx'
import HomeView from './HomeView.jsx'
import Login from './Login.jsx';
import css from '../css/main.css';
import KeyViewList from './KeyViewList.jsx';
import StatisticsView from './StatisticsView.jsx';
import {getKeysForClass} from './helpers/viewHelpers.js';

class ClassesView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentClass: 'Choose a class',
      currentKey: null,
      selectClassId: null,
      currentKeyId: null,
      keysForClass: null

    };

    this.selectClass = this.selectClass.bind(this);
    this.showAllTestsForClass = this.showAllTestsForClass.bind(this);
    this.selectKey = this.selectKey.bind(this);

  }

  componentWillMount() {
    if(this.props.currentCourse) {
      console.log('this is the props for current course id', this.props.currentCourseId)
      this.setState({
        currentClass: this.props.currentCourse,
        selectClassId: this.props.currentCourseId
      })

      console.log ('yaya state', this.props.currentCourseId)

      getKeysForClass(this.props.currentCourseId)
      .then((res) => {
        if (Object.keys(res.data.answerkey).length === 0) {
          this.setState({
            selectClassId: null,
            keysForClass: null
          });
        } else {
          this.setState({
          selectClassId: this.props.currentCourseId,
          currentKey: null, 
          currentKeyId: null,
          keysForClass: res.data.answerkey
          });
        }
      })
    }
  }

  selectClass(event) {
    var classId = event.target.value;
    getKeysForClass(classId)
    .then((res) => {
      if (Object.keys(res.data.answerkey).length === 0) {
        this.setState({
          selectClassId: null,
          keysForClass: null
        });
      } else {
        this.setState({
        selectClassId: classId,
        currentKey: null, 
        currentKeyId: null,
        keysForClass: res.data.answerkey
        });
      }
    })
  }

  showAllTestsForClass() {
    this.setState({
      currentKey: null, 
      currentKeyId: null,
      selectClassId: null,
      keysForClass: null,
      currentClass: 'Choose a class'
    });
  }

  selectKey(key, id) {
    this.setState({
      currentKey: JSON.parse(key.answers),
      currentKeyId: id,
      currentKeyName: key.keyName
    });
  }

  render() { 
    if (this.state.currentClass === 'Choose a class' && this.state.keysForClass === null) {
      return (
      <div>
        <h3 className="entryView">{"Classes"}</h3>
        <form className="dropdown">
        <label>
            Select a class: 
            <select onChange={this.selectClass} >
              <option value={'Choose a class'}>{"Choose a class"}</option>
              {this.props.classes.map((course, key) => {
                return <option value={course.ClassId} key={key}>{course.ClassName}</option>
              })}
            </select>
          </label>
        </form>
      </div>
    );
    } else if (this.state.currentKey === null && this.state.keysForClass) {
      return (
        <div>
          <h3 className="entryView">{"Classes"}</h3>
          <form className="dropdown">
          <label>
              Select a class:
              <select onChange={this.selectClass} >
                <option value={'Choose a class'}>{"Choose a class"}</option>
                {this.props.classes.map((course, key) => {
                  return <option value={course.ClassId} key={key}>{course.ClassName}</option>
                })}
              </select>
            </label>
          </form>
          <KeyViewList 
            currentClass={this.state.selectClassId} 
            selectKey={this.selectKey} 
            showAllTestsForClass={this.showAllTestsForClass} 
            keysForClass={this.state.keysForClass}/>
        </div>
      );
    } else if (this.state.currentKey !== null) {
      return (
        <div>
          <h5 className = "backCrumb" onClick={this.showAllTestsForClass}>{"< Back to all tests"}</h5>
          <h3>{'Biology 101'}</h3>
          <StatisticsView currentKeyName={this.state.currentKeyName} currentKey={this.state.currentKey} currentKeyId={this.state.currentKeyId} showAllTestsForClass={this.showAllTestsForClass}/>
        </div>
      );
    } else if (this.state.selectClassId !== null && this.state.currentKey === null){
      return (
        <div>
        </div>
      );
    }
  }
}

export default ClassesView;
