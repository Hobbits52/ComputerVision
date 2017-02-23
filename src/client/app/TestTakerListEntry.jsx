import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import css from '../css/auth.css';

const TestTakerListEntry = function({ testTitle, testTaker, handleTestTakerClick }) {
  // console.log(params);
  return (
    <div className="testTakerListEntry">
      <Link to={'/testresults/' + testTaker.name}
            activeClassName=""
      >
        {testTaker.name}
      </Link>
    </div>  
  );
}

TestTakerListEntry.propTypes = {
  testTitle: React.PropTypes.string.isRequired,
  testTaker: React.PropTypes.object.isRequired,
  handleTestTakerClick: React.PropTypes.func.isRequired,
}

export default TestTakerListEntry;

// testTaker.choices.split('%').join(' ')