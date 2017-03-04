import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';

class StudentTestListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      test: this.props.test
    };
  }


  render() {
    var result = this.state.test.result * 100 + "%"
    console.log('This is the state test', this.state.test);
    return (
      <tr onClick={() => {this.props.handleUserSelectTest(this.state.test)}}>
        <td>{this.props.currentCourse}</td>
        <td>{result}</td>
      </tr>
    )
  }

}

export default StudentTestListItem;