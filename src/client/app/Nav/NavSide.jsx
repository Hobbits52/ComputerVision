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
      <div className="listItem">
        <img className="menuIcons" alt="Home" src={'../../../assets/white-home.png'}/>
        <Link to="/">Home</Link>
        <img className="hiddenArrow" alt="Home" src={'../../../assets/arrow.png'}/>
      </div>
      <div className="listItem">
        <img className="menuIcons" alt="Students" src={'../../../assets/user.png'}/>
        <Link to="students">Students</Link>
        <img className="hiddenArrow" alt="Home" src={'../../../assets/arrow.png'}/>
      </div>
      <div className="listItem">
        <img className="menuIcons" alt="Classes" src={'../../../assets/white-pencil.png'}/>
        <Link to="classes">Classes</Link>
        <img className="hiddenArrow" alt="Home" src={'../../../assets/arrow.png'}/>
      </div>
      <div className="listItem">
        <img className="menuIcons" alt="Keys" src={'../../../assets/key.png'}/>
        <Link to="keys">Keys</Link>
        <img className="hiddenArrow" alt="Home" src={'../../../assets/arrow.png'}/>
      </div>
      <div className="listItem">
        <img className="menuIcons" alt="Statistics" src={'../../../assets/pie.png'}/>
        <Link to="statistics">Statistics</Link>
        <img className="hiddenArrow" alt="Home" src={'../../../assets/arrow.png'}/>
      </div>
    </div>
  </div>
);

//
export default NavSide;
