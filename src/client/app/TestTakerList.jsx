import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import css from '../css/auth.css';

import TestTakerListEntry from './TestTakerListEntry.jsx';

const TestTakerList = function({ testTitle, testTakers, handleTestTakerClick }) {
  return (
    <div className="testTakerList">
      <h1>We've automagically graded these student's exams for you!</h1>
      <ul>
        {testTakers.map((testTaker, index) =>
          <li><TestTakerListEntry testTitle={testTitle}
                                  testTaker={testTaker}
                                  handleTestTakerClick={handleTestTakerClick}
                                  key={index}
          >
          </TestTakerListEntry></li>
        )}
      </ul>
    </div>  
  );
}

TestTakerListEntry.propTypes = {
  testTitle: React.PropTypes.string.isRequired,
  testTakers: React.PropTypes.array.isRequired,
  handleTestTakerClick: React.PropTypes.func.isRequired
};

export default TestTakerList;
