import React from 'react';

class SubmitScore extends React.Component {

  render() {
    return (
      <>
        <div className="submitScore" style={{height: this.props.height}}>
          <p>Whale played! You got a score of {this.props.score}! Submit your name to see if you're the biggest fish in the sea.</p>
          <div>
            <input></input>
            <button>Submit Score</button>
          </div>
        </div>
      </>
    );
  };
}

export default SubmitScore;