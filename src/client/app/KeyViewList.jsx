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
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>Key ID</th>
            </tr>
              {Object.keys(this.state.keysForClass).map((answerKey, index) => {
                return <KeyViewListItem
                    answerKey={this.state.keysForClass[index + 1]}
                    key={index}             
                    answerID={index + 1} 
                    selectKey={this.props.selectKey}   
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