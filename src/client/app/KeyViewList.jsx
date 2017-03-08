import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import {getKeysForClass} from './helpers/viewHelpers.js';
import KeyViewListItem from './KeyViewListItem.jsx';
import css from '../css/nav.css';

class KeyViewList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentClass:this.props.currentClass,
      keysForClass: this.props.keysForClass,
    };
    console.log('yassss', this.props.keysForClass);
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>Key ID</th>
              <th>Key Name</th>
            </tr>
              {this.state.keysForClass.map((answerKey, index) => {
                console.log('THIS IS THE ANSWER KEY', answerKey);
                return <KeyViewListItem
                    answerKey={this.state.keysForClass[index]}
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