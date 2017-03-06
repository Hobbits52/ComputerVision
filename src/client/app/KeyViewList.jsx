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
      keysForClass: null,
    };
  }

  componentDidMount() {
    getKeysForClass(this.state.currentClass)
    .then((res) => {
      console.log('This is the data coming back', res.data);
      this.setState({
        keysForClass: res.data.answerkey
      })
    })
  }

  render() {
    if (this.state.keysForClass === null) {
      return (
        <div>
        </div>
      );
    } else {
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
}

export default KeyViewList;