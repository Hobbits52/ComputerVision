import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';

class StudentTestListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      test: this.props.test[0]
    };
  }

  render() {
    console.log(this.props.test);
    var result = this.state.test.result * 100 + "%"
    // var result += "%";
    return (
      <tr>
        <td>{this.props.currentCourse}</td>
        <td>{result}</td>
      </tr>
    )
  }

}

export default StudentTestListItem;