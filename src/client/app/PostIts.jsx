import React from 'react';
import css from '../css/main.css';
import {Link} from 'react-router';

class PostIt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="postImage">
        <Link to="/dashboard/classes"><img className="background-image" src={'../assets/post-it.png'}/></Link>
        <h5>{this.props.class.ClassName}</h5>
      </div>
    );
  }
}

export default PostIt;