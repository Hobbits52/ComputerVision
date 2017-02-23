import React from 'react';
import {Link} from 'react-router';
import css from '../../css/nav.css';

const NavSide = props => (
  <div className="col-sm-2 navSide">
    <ul className="navSide">
      <li className="userInfo">
        <img className="left-12" 
             alt="User Picture" 
             src={'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS4twqqq204mp2wMPNjy0BKbsOg7E6wYFM4C3mVFvLaKoBvPu-N9w'} 
             width="150" />
      </li>
      <li>S.L. Jackson, PhD</li>
      <li><Link to="/">Home</Link></li>
      <li><Link to="students">Students</Link></li>
      <li><Link to="classes">Classes</Link></li>
      <li><Link to="keys">Keys</Link></li>
      <li><Link to="statistics">Statistics</Link></li>
    </ul>
  </div>
);

export default NavSide;
