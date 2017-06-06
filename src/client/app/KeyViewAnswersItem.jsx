import React from 'react';
import {Link} from 'react-router';

class KeyViewAnswersItem extends React.Component {
  
  render() {
    const answers = this.props.answer.join(' ');
    return (
      <tr className="testResult">
        <td>{this.props.answerNumber}</td>
        <td>{answers}</td>
      </tr>
    );
  }
}

export default KeyViewAnswersItem;