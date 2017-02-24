import React, { cloneElement } from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import css from '../css/main.css';


class HomeView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      teacher: 'An object with the logged in teacher\'s info.  Picture, Name, etc.',
      students: 'An array of objects, each representing an individual students data.',
      classes: 'An array of objects, each representing the data of an individual class.',
      keys: 'An array of objects, each representing the data corresponding to a particular key.',
      mostRecentTest: 'An object representing the data of the most recent exam to fill the stats view',
    };

    // this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    // this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    // this.handleSidebarClick = this.handleSidebarClick.bind(this);
  }

  handleSearchInputChange(event) {
    event.preventDefault();
    // What happens when the teacher changes the text in the search bar?
  }

  handleSearchSubmit(event) {
    event.preventDefault();
    // What happens when the teacher submits a search in the search bar?
  }

  handleSidebarClick(event) {
    // What happens when the teacher clicks an individual student's exam from the list?
  }

  //
  render() {
    return (
      <div className="col-sm-10 mainContent">
        <h3>To-Do List</h3>
          <div className="postIts">
            <div className="postImage">
              <img className="background-image" src={'../public/post-it.png'}/>
              <h5> - help joe with midterm prep</h5>
            </div>
            <div className="postImage">
              <img className="background-image" src={'../public/post-it.png'}/>
              <h5> - parent teacher conference for sally</h5>
            </div>
            <div className="postImage">
              <img className="background-image" src={'../public/post-it.png'}/>
              <h5> - make midterm key</h5>
            </div>
          </div>
        <h3>My Classes</h3>
        <p>
          {"The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers."}
        </p>
        <p>
        {"And you will know My name is the Lord when I lay My vengeance upon thee.  My money's in that office, right? If she start giving me some bullshit about it ain't there, and we got to go someplace else and get it, I'm gonna shoot you in the head then and there. Then I'm gonna shoot that bitch in the kneecaps, find out where my goddamn money is. She gonna tell me too."}
        </p>
        <p>
        {"Hey, look at me when I'm talking to you, motherfucker. You listen: we go in there, and that nigga Winston or anybody else is in there, you the first motherfucker to get shot. You understand?  Well, the way they make shows is, they make one show. That show's called a pilot. Then they show that show to the people who make shows, and on the strength of that one show they decide if they're going to make more shows. Some pilots get picked and become television programs. Some don't, become nothing. She starred in one of the ones that became nothing."}
        </p>
        <h3>Most Recent Test Results</h3>
        <div className="testTitle">
          <div className="titleText">
            <h4>Test Title</h4>
          </div>
          <img className="graphFake"src="../public/graph-sample.jpg"></img>
        </div>
      </div>
    );
  }
}

export default HomeView;

        // {React.cloneElement(this.props.children, {
        //   teacher: this.state.teacher,
        //   students: this.state.students,
        //   classes: this.state.classes,
        //   keys: this.state.keys,
        //   mostRecentTest: this.state.mostRecentTest,
        //   handleSearchInputChange: this.handleSearchInputChange,
        //   handleSearchSubmit: this.handleSearchSubmit,
        //   handleSidebarClick: this.handleSidebarClick
        // })}
        //
