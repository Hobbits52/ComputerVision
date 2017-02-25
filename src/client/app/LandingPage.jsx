import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import css from '../css/main.css';
import NavTop from './Nav/NavTop.jsx';

class LandingPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <NavTop />
        <div className="landingPage">
          <div className="mainContent">
            <div>
              <img src={"./../public/teachers-choice.jpg"} alt="Number 1 Teachers Choice"/>
            </div>
            <div>
              <h1>Grade Less</h1>
              <h1>Teach More</h1>
              <input type="submit" value="Login" />
            </div>
            <div>
              <img src={"./../public/goodbye.jpg"} alt="Good-bye Scantrons"/>
            </div>
          </div>
          <div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;