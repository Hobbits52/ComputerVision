import React from 'react';
import {Link} from 'react-router';

class KeyViewAnswersItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: this.props.answer.join(' ')
    };
  }


  render() {
    return (
      <tr className="testResult">
        <td>{this.props.answerNumber}</td>
        <td>{this.state.answer}</td>
      </tr>
    );
  }
}

export default KeyViewAnswersItem;