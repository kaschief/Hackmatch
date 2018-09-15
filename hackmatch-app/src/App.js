import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import Hack from './components/HackComponent';
import New from './components/NewComponent';
import Candidate from './components/CandidateComponent';
import Swipe from './components/SwipeComponent';
import NoMatch from './components/NoMatchComponent';
import axios from 'axios';

import './App.css';

//establish the state == set all candidates at an empty array
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: []
    };
  }

  //once the component mounts, request from API, the reset state
  componentDidMount() {
    axios
      .get(`http://localhost:8000/candidates?_sort=id&_order=desc`)
      .then(res => {
        let candidates = res.data;
        this.setState({ candidates });
      });
  }

  render() {
    //this allows the feedback of "loading" while the state is empty, before fetching
    // if (!this.state.candidates) {
    //   return (
    //     <div className="Home">
    //       <h1>All candidates</h1>
    //       Loading...
    //     </div>
    //   );
    // }

    return (
      <div className="App">
        <div className="container">
          {/* Links go here */}
          <nav>
            <Link to="/">HackMatch</Link>{' '}
            <Link to="/new">Add New Candidate</Link>{' '}
            <Link to="/swipe">Swipe</Link>{' '}
          </nav>
          <hr />
          {/* Routes go Here */}
          <Switch>
            {/* here, the state is being passed over to Hack canidates as the props.candidates */}
            <Route
              path="/"
              exact
              render={props => <Hack candidates={this.state.candidates} />}
            />
            <Route path="/new" exact component={New} />
            <Route
              path="/candidate/:id"
              render={props => (
                <Candidate {...props} candidates={this.state.candidates} />
              )}
            />
            <Route path="/swipe" component={Swipe} />
            <Route path="" component={NoMatch} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
