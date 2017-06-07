import React from 'react';
import {browserHistory} from 'react-router';

// setting a key with the index is an anti-pattern
// https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318
// used to generate a unique key for react mapped components
import shortid from 'shortid';

class Dropdown extends React.Component {

  render() { 
    return (
      <form className="dropdown">
      <label>
          Select a class: 
          <select onChange={this.props.selectClass} value={this.props.selectClassId}>
            <option value={'Choose a class'}>{"Choose a class"}</option>
            {this.props.classes.map((course, key) => {
              return <option value={course.ClassId} key={shortid.generate()}>{course.ClassName}</option>
            })}
          </select>
        </label>
      </form>
    );
  };

}

export default Dropdown;