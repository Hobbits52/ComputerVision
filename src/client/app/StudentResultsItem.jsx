import React from 'react';
import {Link} from 'react-router';
import {compareArrays} from './../../server/utility/helpers.js';

class StudentResultsItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      studentAnswer: this.props.studentAnswer.join(' '),
      keyAnswer: this.props.keyAnswer.join(' ')
    };
  }


  render() {  
    if (compareArrays(this.props.studentAnswer, this.props.keyAnswer)) {
      var imageUrl = '../../assets/white-check.png';
      var altText = "correct";
    } else {
      var imageUrl = '../../assets/red-wrong.png';
      var altText = "wrong answer";
    }

    return (
      <tr className="testResult">
        <td>{this.props.testNum}</td>
        <td>{this.state.studentAnswer}</td>
        <td>{this.state.keyAnswer}</td>
        <td>
          <img className="answers" alt={altText} src={imageUrl}/>
        </td>
      </tr>
    );
  }
}

export default StudentResultsItem;