import React from 'react';
import {browserHistory} from 'react-router';
import {getKeysForClass} from './helpers/viewHelpers.js';

// setting a key with the index is an anti-pattern
// https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318
// used to generate a unique key for react mapped components
import shortid from 'shortid';

// components
import NavBar from './Nav/NavBar.jsx'
import NavSide from './Nav/NavSide.jsx'
import TeacherViewContainer from './TeacherViewContainer.jsx'
import HomeView from './HomeView.jsx'
import Login from './Login.jsx';
import css from '../css/main.css';
import KeyViewList from './KeyViewList.jsx';
import StatisticsView from './StatisticsView.jsx';
import Dropdown from './Dropdown.jsx';
import Spinner from './Spinner.jsx';

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

// --------------------------------------------------------------------
// Component Lifecycle Functions
// --------------------------------------------------------------------

  componentWillMount() {
    if(this.props.currentCourse) {
      this.setState({
        currentClass: this.props.currentCourse,
        selectClassId: this.props.currentCourseId
      })

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

// --------------------------------------------------------------------


// --------------------------------------------------------------------
// Event Handlers
// --------------------------------------------------------------------

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
  
// --------------------------------------------------------------------

  render() { 
    if (this.state.currentClass === 'Choose a class' && this.state.keysForClass === null) {
      return (
      <div>
        <h3 className="entryView">{"Classes"}</h3>
        <Dropdown selectClass={this.selectClass} classes={this.props.classes}/>
      </div>
    );
    } else if (this.state.currentKey === null && this.state.keysForClass) {
      return (
        <div>
          <h3 className="entryView">{"Classes"}</h3>
          <Dropdown selectClass={this.selectClass} classes={this.props.classes}/>
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
          <StatisticsView currentKeyName={this.state.currentKeyName} 
                          currentKey={this.state.currentKey} 
                          currentKeyId={this.state.currentKeyId} 
                          showAllTestsForClass={this.showAllTestsForClass}/>
        </div>
      );
    } else if (this.state.selectClassId !== null && this.state.currentKey === null){
      return (
        <Spinner />
      );
    }
  }
}

export default ClassesView;
