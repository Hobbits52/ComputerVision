import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import Login from './Login.jsx';
import css from '../css/construction.css';

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
    return this.props.children;
  }

}

export default App;


