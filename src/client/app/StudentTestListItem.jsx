import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';

class StudentTestListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      test: this.props.test
    };
  }


  render() {
    var result = this.state.test.result * 100 + "%"

    var testName = '';

    for (var i = 0; i < this.props.classes.length; i++) {
      for(var j =0; j < this.props.classes[i].answerKeys.length; j++) {
        if (this.props.classes[i].answerKeys[j].keyId === this.props.test.answerKeyId) {
          testName = this.props.classes[i].answerKeys[j].keyName;
        }
      }
    }

    return (
      <tr onClick={() => {this.props.handleUserSelectTest(this.state.test)}}>
        <td>{this.props.currentCourse}</td>
        <td>{testName}</td>
        <td>{result}</td>
      </tr>
    )
  }

}

export default StudentTestListItem;