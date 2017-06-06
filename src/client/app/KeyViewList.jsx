import React from 'react';
import {browserHistory} from 'react-router';
import {getKeysForClass} from './helpers/viewHelpers.js';
import css from '../css/nav.css';

// components
import KeyViewListItem from './KeyViewListItem.jsx';

class KeyViewList extends React.Component {
  
  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>Key ID</th>
              <th>Key Name</th>
            </tr>
              {this.props.keysForClass.map((answerKey, index) => {
                return <KeyViewListItem
                    answerKey={this.props.keysForClass[index]}
                    key={index}             
                    answerID={index + 1} 
                    selectKey={this.props.selectKey}  
                    keyName={answerKey.keyName} 
                />
              })
            }
          </tbody>
        </table>
      </div>
    );  
  }
}

export default KeyViewList;