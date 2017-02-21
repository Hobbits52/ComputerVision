import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import css from '../css/auth.css';

const TestTakerListEntry = function({ testTitle, testTaker, handleTestTakerClick }) {
  return (
    <div className="testTakerListEntry">
      <Link to="#" >{testTaker.name + ' ' + testTaker.choices.split('%').join(' ')}</Link>
    </div>  
  );
}

// TestTakerListEntry.propTypes = {
//   testTitle: PropTypes.string.isRequired,
//   testTaker: PropTypes.object.isRequired,
//   handleTestTakerClick: PropTypes.function.isRequired,
// }

export default TestTakerListEntry;