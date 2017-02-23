import React from 'react';
import {render} from 'react-dom';
import {Link, browserHistory} from 'react-router';
import NavTop from './Nav/NavTop.jsx'
import NavSide from './Nav/NavSide.jsx'
import TeacherViewContainer from './TeacherViewContainer.jsx'
import Login from './Login.jsx';
import css from '../css/nav.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // State variables to go here
    };

    // this.handleSomeEvent = this.handleSomeEvent.bind(this);
  }

// --------------------------------------------------------------------
// Component Lifecycle Functions
// --------------------------------------------------------------------

  componentDidMount() {
    
  }
// --------------------------------------------------------------------


// --------------------------------------------------------------------
// Event Handlers
// --------------------------------------------------------------------

  handleSomeEvent(someParameter) {
    
  }
// --------------------------------------------------------------------

// <div className="construction">
//   <p>Under Construction!</p>
// </div>

  render() {
    return (
      <div>
        <NavTop />
        <div className="container-fluid below-nav-top">
          <div className="row">
            <NavSide className="navSide"/>
            <TeacherViewContainer>
              {this.props.children}
            </TeacherViewContainer>
          </div>
        </div>
      </div>
    );
  }

}

export default App;

//{this.props.children}
