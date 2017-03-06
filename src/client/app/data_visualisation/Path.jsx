import React from 'react';
import * as d3 from "d3";

class Path extends React.Component {
  render() {
    let [start, end] = this.props.scale.range();
    let d = `M0${start},6V0H${end}V6`;

    return (
      <path className="react-d3-histogram__domain" d={d} />
    );
  }
}

Path.propTypes = {
  scale: React.PropTypes.func.isRequired
};

export default Path;
