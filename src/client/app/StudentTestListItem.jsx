import React from 'react';
import {browserHistory} from 'react-router';

class StudentTestListItem extends React.Component {
  
  render() {
    var result = this.props.test.result * 100 + "%"

    var testName = '';

    for (var i = 0; i < this.props.classes.length; i++) {
      for(var j =0; j < this.props.classes[i].answerKeys.length; j++) {
        if (this.props.classes[i].answerKeys[j].keyId === this.props.test.answerKeyId) {
          testName = this.props.classes[i].answerKeys[j].keyName;
        }
      }
    }

    return (
      <tr onClick={() => {this.props.handleUserSelectTest(this.props.test)}}>
        <td>{this.props.currentCourse}</td>
        <td>{testName}</td>
        <td>{result}</td>
      </tr>
    )
  }

}

export default StudentTestListItem;