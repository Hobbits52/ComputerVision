import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import Nav from './Nav/Nav.jsx'
import NavSide from './Nav/NavSide.jsx'
import TeacherViewContainer from './TeacherViewContainer.jsx'
import HomeView from './HomeView.jsx'
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
        {"ClassesView"}
      </div>
    );
  }

}

export default App;

//{this.props.children}
