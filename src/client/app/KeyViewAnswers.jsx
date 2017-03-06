import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import css from '../css/nav.css';
import KeyViewAnswersItem from './KeyViewAnswersItem.jsx'


class KeyViewAnswers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false
    };
    this.showImage = this.showImage.bind(this);
  }

  showImage() {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  // once url is included in server-side, remove hardcode on line 20
  render() { 
    if (this.state.clicked) {
      var arrowText = "Hide scan"
    } else {
      var arrowText = "Show scan"
    }
    return (
        <div>
          <div className="answerKey">
            <h5 onClick={this.showImage} >{arrowText}</h5>
            <img src={"http://res.cloudinary.com/dn4vqx2gu/image/upload/v1488063990/a0r7nm168jnjmoiruznx.jpg"} alt={"answer key for " + this.props.currentKeyId} />
          </div>
          <table>
            <tbody>
              <tr>
                <th>Question #</th>
                <th>Answer</th>
              </tr>
              {Object.keys(this.props.currentKey).map((answer, key) => {
                return <KeyViewAnswersItem
                  answer={this.props.currentKey[key + 1]}
                  key={key}
                  answerNumber={key + 1} />
              })
              }
            </tbody>
          </table>
        </div>
 
    );
  }
}

export default KeyViewAnswers;

