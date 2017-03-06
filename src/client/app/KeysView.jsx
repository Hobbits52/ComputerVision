import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import css from '../css/nav.css';
import KeyViewList from './KeyViewList.jsx';
import KeyViewAnswers from './KeyViewAnswers.jsx'

class KeysView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentClass: 'Choose a class',
      selectedClass: null,
      currentKey: null,
      currentKeyId: null
    };

    this.selectClass = this.selectClass.bind(this);
    this.selectKey = this.selectKey.bind(this);
    this.showAllTestsForClass = this.showAllTestsForClass.bind(this);
    this.showImage = this.showImage.bind(this);

  }

  selectClass(event) {
    this.setState({
      selectedClass: event.target.value,
      currentClass: this.state.selectedClass
    });
  }

  selectKey(key, id) {
    console.log('this is the key', key);
    this.setState({
      currentKey: JSON.parse(key),
      currentKeyId: id
    })
  }

  showAllTestsForClass() {
    this.setState({
      currentKey: null, 
      currentKeyId: null,
      selectedClass: null,
      currentClass: 'Choose a class'
    })
  }

  showImage(answerID) {
    //use answerID to call redis
    //use url to access image and save image to file system
    //every time you call this function, it will overwite the image
    //only one image should be stored at a time

  }

  render() { 
    if (this.state.selectedClass === null) {
      return (
      <div>
        <h3 className="entryView">{"Keys"}</h3>
        <form className="dropdown">
        <label>
            Select a class: 
            <select value={this.state.currentClass} onChange={this.selectClass} >
              <option value={'Choose a class'}>{"Choose a class"}</option>
              {this.props.classes.map((course, key) => {
                return <option value={course.ClassId} key={key}>{course.ClassName}</option>
              })}
            </select>
          </label>
        </form>
      </div>
    );
    } else if (this.state.selectedClass !== null && this.state.currentKey === null) {
      return (
        <div>
          <h3 className="entryView">{"Keys"}</h3>
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
          <KeyViewList currentClass={this.state.selectedClass} selectKey={this.selectKey} />
        </div>
      );
    } else if (this.state.currentKey !== null) {
      return (
        <div>
          <h5 className = "backCrumb" onClick={this.showAllTestsForClass}>{"< Back to all keys"}</h5>
          <h3>{"Key " + this.state.currentKeyId}</h3>
          <KeyViewAnswers currentKey={this.state.currentKey} currentKeyId={this.state.currentKeyId} />
        </div>
      );
    }
  }
}

export default KeysView;

