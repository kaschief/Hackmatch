import React, { Component } from 'react';
import axios from 'axios';

/*because we are not displaying all candidates, and because we are only adding to the API
the state here is set as blank, so that populate it with the "new" data, and send the new candidate as the updated state*/

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picUrl: ' ',
      name: ' ',
      surname: ' ',
      isLoading: false
    };
  }

  //event to capture typed data from input fields
  handleInputChange = event => {
    event.preventDefault();
    //change the state by making every invidal this.state.entry equal to the event.target.value
    //the input fields always produce an event.target object that contains the name of the field and the value
    //so make the state entry event.target.name (of the input field) and the value to event.target.value
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  //event to submit -- call API here
  handleSubmit = event => {
    event.preventDefault(); //to prevent submission
    //the data to be sent is the state as it currently is this.state.[etc]
    axios
      .post('http://localhost:8000/candidates', {
        name: this.state.name,
        surname: this.state.surname,
        numberOfLikes: 0,
        numberOfNexts: 0,
        picUrl: this.state.picUrl
      })
      .then(response => {
        this.props.history.push('/'); // to return to home page
      });
  };

  render() {
    return (
      <div>
        <h1>Add new Candidate</h1>
        {/* onSubmit belongs to the form, the action will be done when the entire form (button clicked) is done */}
        <form onSubmit={e => this.handleSubmit(e)}>
          <div className="form-group">
            <label>Picture URL</label>
            <input
              type="text"
              name="picUrl" //will appear as event.target.name i.e "picUrl"
              className="form-control"
              id="picUrl"
              placeholder="Picture URL"
              //set this value as what the state currently is (two-way binding)
              value={this.state.picUrl} //will appear as event.target.value
              onChange={e => this.handleInputChange(e)} //this attribute communicates to the state via event
            />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name" //will appear as event.target.name i.e "name"
              className="form-control"
              id="name"
              placeholder="Name"
              value={this.state.name}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <div className="form-group">
            <label>Surname</label>
            <input
              type="text"
              name="surname" //will appear as event.target.name i.e "surname"
              className="form-control"
              id="surname"
              placeholder="Surname"
              value={this.state.surname}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Create Candidate
          </button>
        </form>
      </div>
    );
  }
}

export default New;
