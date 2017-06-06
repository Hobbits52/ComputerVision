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

  // TODO:once url is included in server-side, remove hardcode on line 20
  render() { 
    if (this.state.clicked) {
      var arrowText = "Hide scan";
      var toggleImage = "showImage";
    } else {
      var arrowText = "Show scan";
      var toggleImage = "hideImage";
    }
    return (
        <div>
          <div className="answerKey">
            <div className="answerKeyTitle" onClick={this.showImage}>
              <h5>{arrowText}</h5>
            </div>
            <div className={toggleImage} >
              <img src={"http://res.cloudinary.com/dn4vqx2gu/image/upload/v1488063990/a0r7nm168jnjmoiruznx.jpg"} alt={"answer key for " + this.props.currentKeyId} />
            </div>
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

