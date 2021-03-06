import React from 'react';
import {browserHistory} from 'react-router';
import {getKeysForClass} from './helpers/viewHelpers.js';
import css from '../css/nav.css';

// setting a key with the index is an anti-pattern
// https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318
// used to generate a unique key for react mapped components
import shortid from 'shortid';

// components
import KeyViewList from './KeyViewList.jsx';
import KeyViewAnswers from './KeyViewAnswers.jsx';
import Dropdown from './Dropdown.jsx';

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

// --------------------------------------------------------------------

  render() { 
    if (this.state.selectClassId === null) {
      return (
      <div>
        <h3 className="entryView">{"Keys"}</h3>
        <Dropdown selectClass={this.selectClass} classes={this.props.classes}/>
      </div>
    );
    } else if (this.state.currentKey === null) {
      return (
        <div>
          <h3 className="entryView">{"Keys"}</h3>
          <Dropdown selectClass={this.selectClass} 
                    classes={this.props.classes}
                    selectClassId={this.state.selectClassId}/>
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
          <KeyViewAnswers currentKeyName={this.state.currentKeyName} 
                          currentKey={this.state.currentKey} 
                          currentKeyId={this.state.currentKeyId} 
                          showAllTestsForClass={this.showAllTestsForClass}/>
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

