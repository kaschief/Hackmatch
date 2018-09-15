import React from 'react';

const Candidate = props => {
  //the props are passed over from Route (in addition to candidates, which I passed over directly)
  let candidates = props.candidates;
  let id = props.match.params.id;
  let theCandidate = candidates.find(c => c.id == id);

  return (
    <div className="jumbotron">
      {/* <h1 className="display-3">This Candidate</h1> */}
      {theCandidate && (
        <div>
          <h4>{theCandidate.name}</h4>
          <div className="card" style={{ width: '18rem' }}>
            <img
              className="card-img-top"
              src={theCandidate.picUrl}
              alt={theCandidate.name}
            />
            <div className="card-body">
              <p className="card-text">
                {theCandidate.name + ' ' + theCandidate.surname} Likes:{' '}
                {theCandidate.numberOfLikes + '  '} Nexts:{' '}
                {theCandidate.numberOfNexts}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Candidate;
