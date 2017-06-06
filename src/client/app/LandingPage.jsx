import React from 'react';
import {Link} from 'react-router';
import css from '../css/main.css';

// components
import NavBar from './Nav/NavBar.jsx';

class LandingPage extends React.Component {

  render() {
    return (
      <div>
        <NavBar location={this.props.location}/>
        <div className="landingPage">
          <div className="mainAdvertising">
            <div className="writingImage">
              <img src={"./../assets/teachers-choice.jpg"} alt="Number 1 Teachers Choice"/>
            </div>
            <div className="center">
              <img className="pencil" src={"./../assets/pencil-horizontal.png"} alt="Horizontal Pencil"/>
              <h1>Grade Less</h1>
              <h1>Teach More</h1>
              <Link to="/signup"><input className="getStarted" type="button" value="Get Started" /></Link>
            </div>
            <div className="writingImage">
              <img src={"./../assets/goodbye.jpg"} alt="Good-bye Scantrons"/>
            </div>
          </div>
          <div className="bonusContent">
            <div className="bonusItem">
              <h3>No more scantrons</h3>
              <img src={"./../assets/printer.png"} alt="Printer"/>
            </div>
            <div className="bonusItem">
              <h3>Automated grading</h3>
              <img src={"./../assets/iphone.png"} alt="iPhone"/>
            </div>
            <div className="bonusItem">
              <h3>Data visuals</h3>
              <img src={"./../assets/graph.png"} alt="Graph"/>
            </div>
            <div className="bonusItem">
              <h3>Storage in the cloud</h3>
              <img src={"./../assets/cloud.png"} alt="Cloud"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;