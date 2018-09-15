import React, { Component } from 'react';
import axios from 'axios';

// Create a button to display a card with a random candidate. This card will include two buttons: 'Like' and 'Next'.
// When we click in 'Like', we will update the 'numberOfLikes' + 1 and we will display a new contact.
// If we click 'Next' we will update the 'numberOfNexts' + 1 and we will display a new contact.

class Swipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidate: {}
    };
  }

  componentDidMount = () => {
    axios.get(`http://localhost:8000/candidates`).then(res => {
      //console.log(res.data);
      let candidates = res.data;
      //select a random index from the array
      let randomIndex = Math.floor(Math.random() * res.data.length);
      //console.log(candidates[randomIndex]);
      //update the state so that the canidate (an object) is the one randomly chosen from the list
      this.setState({ candidate: candidates[randomIndex] });
    });
  };

  handleClick = type => {
    //modify the API (not the state)
    //number of Likes/Next is one part of the API
    //will assemble the data and update only that part of the API using PATCH
    let data;
    if (type === 'like') {
      data = { numberOfLikes: this.state.candidate.numberOfLikes + 1 };
    } else data = { numberOfNexts: this.state.candidate.numberOfNexts + 1 };

    console.log('This is the data', data);
    //now send data to API/axios patch
    //--first gather the specific URL of the specific candidate

    let url = 'http://localhost:8000/candidates/' + this.state.candidate.id;

    axios.patch(url, data).then(response => {
      //after sending the data, update the state with the new information

      console.log('This is the RESPONSE', response);
      this.setState({
        candidate: response.data
      });
      //how to do I move to the next page?
      this.props.history.push('/swipe');
    });
  };

  render() {
    return (
      <div>
        <div>
          <h4>{this.state.candidate.name}</h4>
          <div className="card" style={{ width: '18rem' }}>
            <img
              className="card-img-top"
              src={this.state.candidate.picUrl}
              alt=""
            />
            <div className="card-body">
              <p className="card-text">
                Likes: {this.state.candidate.numberOfLikes + '  '} Nexts:{' '}
                {this.state.candidate.numberOfNexts}
              </p>
            </div>
          </div>
        </div>
        {/* make the buttons event listeners to adjust elements state */}
        <button onClick={e => this.handleClick('like')}>Like</button>
        <button onClick={e => this.handleClick('next')}>Next</button>
      </div>
    );
  }
}
export default Swipe;
