import React from 'react';
import css from '../css/main.css';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';

class PostIt extends React.Component {
  
  render() {
    return (
      <div className="postImage" onClick={() => {
        this.props.handlePostItClick(this.props.class.ClassName, this.props.class.ClassId)
      }}>
        <Link to= "/dashboard/classes/">
            <img className="background-image" src={'../assets/post-it.png'}/>
        </Link>
        <h5>{this.props.class.ClassName}</h5>
      </div>
    );
  }
}

export default PostIt;