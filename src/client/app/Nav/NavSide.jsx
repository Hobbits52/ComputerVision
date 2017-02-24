import React from 'react';
import {Link} from 'react-router';
import css from '../../css/nav.css';

const NavSide = props => (
  <div className="col-sm-2 navSide">
    <div className="navSide">
      <div className="userInfo">
        <img className="left-12" 
             alt="User Picture" 
             src={'../../../public/apple.png'} 
             width="150"/>
      </div>
      <div className="name">S.L. Jackson, PhD</div>
      <div className="listItem"><Link to="/">Home</Link></div>
      <div className="listItem"><Link to="students">Students</Link></div>
      <div className="listItem"><Link to="classes">Classes</Link></div>
      <div className="listItem"><Link to="keys">Keys</Link></div>
      <div className="listItem"><Link to="statistics">Statistics</Link></div>
    </div>
  </div>
);

export default NavSide;
