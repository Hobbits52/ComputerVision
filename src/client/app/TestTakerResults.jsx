import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import css from '../css/auth.css';

class TestTakerResults extends React.Component {
// const TestTakerResults = function({ testTitle, testTaker, handleTestTakerClick }) {
  render() {
    console.log(this.props);
    return (
      <div className="testTakerResults">
        <h1>{this.props.params.testTaker}</h1>
        <h3>Test Name</h3>
        <table>
          <tbody>
            <tr>
              <td>A</td>
              <td>A</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>C</td>
              <td>D</td>
              <td>❌</td>
            </tr>
            <tr>
              <td>E</td>
              <td>B</td>
              <td>❌</td>
            </tr>
            <tr>
              <td>B</td>
              <td>B</td>
              <td>✅</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

// TestTakerListEntry.propTypes = {
//   testTitle: PropTypes.string.isRequired,
//   testTaker: PropTypes.object.isRequired,
//   handleTestTakerClick: PropTypes.function.isRequired,
// }

export default TestTakerResults;