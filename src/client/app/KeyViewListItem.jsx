import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';

class KeyViewListItem extends React.Component {

  render() {
    return (
      <tr onClick={() => this.props.selectKey(this.props.answerKey, this.props.answerID)}>
        <td>{this.props.answerID}</td>
        <td>{this.props.keyName}</td>
      </tr>
    )
  }

}

export default KeyViewListItem;