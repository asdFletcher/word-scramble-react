import React from 'react';
import { Table } from 'antd';
import '../../node_modules/antd/dist/antd.css';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../store/actions.js';
import ScoreReport from './ScoreReport.js';

const columns = [
  {
    title: 'Rank',
    dataIndex: 'rank',
    key: 'rank',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Score',
    dataIndex: 'score',
    key: 'score',
  },
];

const mapStateToProps = (state) => {
  return {
    id: state.id,
    topTenScores: state.topTenScores,
    scoresLoading: state.scoresLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateIsTopTen: (payload) => dispatch(actions.updateIsTopTen(payload)),
    updateScoresFromDB: (payload) => dispatch(actions.updateScoresFromDB(payload)),
    updateScoresLoading: (payload) => dispatch(actions.updateScoresLoading(payload)),
  }
}

class HiScores extends React.Component {
  async componentDidMount() {
    try {
      let url = `http://localhost:3001/get-scores`;
      this.props.updateScoresLoading(true);
      let res = await fetch(url)
      this.props.updateScoresLoading(false);
      let data = await res.json();

      // assign rank and detect if current user is in top 10
      await data.forEach(async (score, index) => {
        score.rank = index + 1;
        if (this.props.id && this.props.id === score.id) {
          score.className = 'belongsToCurrentUser';
          this.props.updateIsTopTen(true);
        }
      });
      
      this.props.updateScoresFromDB(data);
    } catch (err) {
      console.error(`error retrieving scores from the server: `, err);
    }
  }

  render() {
    let scores = this.props.topTenScores;
    let scoresLoading = this.props.scoresLoading;

    return (
      <div className="score-page-container">
        <h3>Hi Scores</h3>
        <ul>
          <Table
            className={'top-ten-score-table'}
            columns={columns} 
            dataSource={scores}
            pagination={false}
            rowClassName={ (record) => record.className}
            loading={scoresLoading}
             />
        </ul>
        <ScoreReport />
        <button className="startButton"><NavLink to="/play-game">Play Game</NavLink></button>
      </div>
    );
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(HiScores);
