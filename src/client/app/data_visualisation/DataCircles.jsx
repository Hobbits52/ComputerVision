import React from 'react';

// ----------------------------------------------------------------------------
// This can be included inside the DataCircles class as a method?
// 
// Or, it can be placed inside another file?
// ----------------------------------------------------------------------------

const renderCircles = (props) => {          // Should I define this function inside a DataCircles class
  return (coords, index) => {               // as a method, and then refer to it as this.renderCircles(props)
    const circleProps = {                   // inside of the return statement on line 17?
      cx: props.xScale(coords[0]),
      cy: props.yScale(coords[1]),
      r: 2,
      key: index
    };
    return (
      <circle {...circleProps} />
    );
  };
};

// ----------------------------------------------------------------------------

const DataCircles =  (props) => {
  return (
    <g>{ props.data.map(renderCircles(props)) }</g>
  );
}

export default DataCircles;
