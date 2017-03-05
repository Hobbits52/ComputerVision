import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import css from '../css/nav.css';
import KeyViewAnswersItem from './KeyViewAnswersItem.jsx'


class KeyViewAnswers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() { 
    return (
        <div>
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

