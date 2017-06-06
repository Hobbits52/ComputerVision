import React from 'react';
import {Link} from 'react-router';
import {compareArrays} from './../../server/utility/helpers.js';

class StudentResultsItem extends React.Component {

  render() {  

    // logic for rendering check mark (correct) or red x (incorrect)
    if (compareArrays(this.props.studentAnswer, this.props.keyAnswer)) {
      var imageUrl = '../../assets/white-check.png';
      var altText = "correct";
    } else {
      var imageUrl = '../../assets/red-wrong.png';
      var altText = "wrong answer";
    }

    const studentAnswer = this.props.studentAnswer.join(' ');
    const keyAnswer = this.props.keyAnswer.join(' ');

    return (
      <tr className="testResult">
        <td>{this.props.testNum}</td>
        <td>{studentAnswer}</td>
        <td>{keyAnswer}</td>
        <td>
          <img className="answers" alt={altText} src={imageUrl}/>
        </td>
      </tr>
    );
  }
}

export default StudentResultsItem;