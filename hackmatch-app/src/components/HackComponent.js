import React from 'react';
import { Link } from 'react-router-dom';

const Hack = props => {
  //Hack received the state (all the candidates) in its props
  return (
    <div className="jumbotron">
      <h1 className="display-5">All Candidates</h1>
      <div>
        {props.candidates.map(candidate => (
          //setting the ID as the list key
          <div key={candidate.id}>
            <div className="card" style={{ width: '18rem' }}>
              <Link to={'/candidate/' + candidate.id}>
                <img
                  className="card-img-top"
                  src={candidate.picUrl}
                  alt={candidate.name}
                />
                <div className="card-body">
                  <p className="card-text">
                    {candidate.name + ' ' + candidate.surname} Likes:{' '}
                    {candidate.numberOfLikes + '  '} Nexts:{' '}
                    {candidate.numberOfNexts}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Hack;
