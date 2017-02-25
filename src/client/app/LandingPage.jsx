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
            <div className="writingImage">
              <img src={"./../public/teachers-choice.jpg"} alt="Number 1 Teachers Choice"/>
            </div>
            <div className="center">
              <img src={"./../public/pencil-horizontal.png"} alt="Good-bye Scantrons"/>
              <h1>Grade Less</h1>
              <h1>Teach More</h1>
              <input className="getStarted" type="button" value="Get Started" />
            </div>
            <div className="writingImage">
              <img src={"./../public/goodbye.jpg"} alt="Good-bye Scantrons"/>
            </div>
          </div>
          <div className="bonusContent">
            <div>
              <h3>No more scantrons</h3>
            </div>
            <div>
              <h3>Automated grading</h3>
            </div>
            <div>
              <h3>Data visualization</h3>
            </div>
            <div>
              <h3>Storage in the cloud</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;