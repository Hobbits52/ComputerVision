import React  from 'react';
import Axis   from './Axis.jsx';

const XYAxis = (props) => {
  
  const xSettings = {
    translate: `translate(0, ${(props.height - props.padding)})`,
    scale: props.xScale,
    orient: 'bottom'
  };
  
  const ySettings = {
    translate: `translate(${props.padding}, 0)`,
    scale: props.yScale,
    orient: 'left'
  };

  return (
    <g className="xy-axis">
      <Axis {...xSettings}/>
      <Axis {...ySettings}/>
    </g>
  );
}

export default XYAxis;

// Consider Danny's words with regard to your style here:
// 
// - destructuring props is good for when you have very large objects, or objects with potentially unknown keys
// - otherwise it just adds a layer of indirection in between the props and where they are used
// - meh it doesn’t really matter i suppose, there’s a benefit of giving the variable a name
// - there may be some performance penalty since babel will transpile destructuring into a more verbose syntax, but probably negligible
// - sorry just brain dumping here
// - i don’t feel strongly about it