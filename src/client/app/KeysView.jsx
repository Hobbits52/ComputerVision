import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import css from '../css/nav.css';
import KeyViewList from './KeyViewList.jsx';
import KeyViewAnswers from './KeyViewAnswers.jsx'
import {getKeysForClass} from './helpers/viewHelpers.js';

class KeysView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectClassId: null,
      currentKey: null,
      currentKeyId: null,
      keysForClass: null,
      currentKeyName: null

    };

    this.selectClass = this.selectClass.bind(this);
    this.selectKey = this.selectKey.bind(this);
    this.showAllTestsForClass = this.showAllTestsForClass.bind(this);

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

  selectKey(key, id) {
    this.setState({
      currentKey: JSON.parse(key.answers),
      currentKeyId: id,
      currentKeyName: key.keyName
    });
  }

  showAllTestsForClass() {
    this.setState({
      currentKey: null, 
      currentKeyId: null,
      selectClassId: null
    });
  }

  render() { 
    if (this.state.selectClassId === null) {
      return (
      <div>
        <h3 className="entryView">{"Keys"}</h3>
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
    } else if (this.state.currentKey === null) {
      return (
        <div>
          <h3 className="entryView">{"Keys"}</h3>
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
          <h5 className = "backCrumb" onClick={this.showAllTestsForClass}>{"< Back to all keys"}</h5>
          <h3>{this.state.currentKeyName}</h3>
          <KeyViewAnswers currentKeyName={this.state.currentKeyName} currentKey={this.state.currentKey} currentKeyId={this.state.currentKeyId} showAllTestsForClass={this.showAllTestsForClass}/>
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

export default KeysView;

