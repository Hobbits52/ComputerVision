import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';

class KeyViewListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }


  render() {
    return (
      <tr onClick={() => this.props.selectKey(this.props.answerKey, this.props.answerID)}>
        <td>{this.props.answerID}</td>
        <td>
          <a href="http://www.google.com">{'Definitely a redirect to the cloudinary image'}</a>
        </td>
      </tr>
    )
  }

}

export default KeyViewListItem;