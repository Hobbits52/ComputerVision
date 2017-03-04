import React from 'react';
import * as d3 from "d3";

class Axis extends React.Component {
  componentDidUpdate() {
    this.renderAxis();
  }

  componentDidMount() {
    this.renderAxis();
  }

  renderAxis() {
    var node  = this.refs.axis;
    var axis = this.props.orient.ticks(5).scale(this.props.scale);
    d3.select(node).call(axis);
  }

  render() {
    return (
      <g className="axis" ref="axis" transform={this.props.translate}></g>
    );
  }
}

export default Axis;