import React from 'react';
import { fetchPost } from '../util/util.js';
import { connect } from 'react-redux';
import uuidv4 from 'uuid';
import * as actions from '../store/actions.js';
import { Redirect } from 'react-router-dom';

const mapStateToProps = (state) => {
  console.log(`submit score MSTP: `, state);
  return {
    score: state.score,
    id: state.id,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addScoreID: (payload) => dispatch(actions.addScoreID(payload)),
  }
}

class SubmitScore extends React.Component {
  state = {};

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/hi-scores'/>
    }
  }

  handleSubmitScore = async () => {
    let id = uuidv4();
    let scoreData = {
      name: this.state.userName,
      score: this.props.score,
      id: id,
    }
    this.props.addScoreID(id);
    await fetchPost('http://localhost:3001/save-score', scoreData);
    this.setState({redirect: true});
  }

  handleInput = ({target}) => {
    if (!target.value.trim()) {
      this.setState({userName: 'anonymous'});
    } else {
      this.setState({userName: target.value});
    }
  };

  render() {
    return (
      <>
        {this.renderRedirect()}
        <div className="submitScore" style={{height: this.props.height}}>
          <p>Whale played! You got a score of {this.props.score}! Submit your name to see if you're the biggest fish in the sea.</p>
          <div>
            <input onChange={this.handleInput}></input>
            <button onClick={this.handleSubmitScore}>Submit Score</button>
          </div>
        </div>
      </>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitScore);