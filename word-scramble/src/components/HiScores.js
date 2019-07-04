import React from 'react';
import { Table } from 'antd';
import '../../node_modules/antd/dist/antd.css';

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



class HiScores extends React.Component {
  state = {
    scores: [],
  };

  async componentDidMount() {
    // emit action to get scores
    // emit action to set loading true
    // when scores load emit action to set loading false
    console.log(`🍏  hi scores mounted`);
    try {
      let url = `http://localhost:3001/get-scores`;
      let res = await fetch(url);
      let data = await res.json();
      data.forEach((score, index) => {
        score.rank = index + 1;
      });
      this.setState({scores: data});
    } catch (err) {
      console.error(`error retrieving scores from the server: `, err);
    }
  }

  getColumns = () => {
    return 
    
  }

  render() {
    console.log(`🍊 hi scores render: `, this.state);
    let scores = this.state.scores;
    return (
      <div className="score-page-container">
        <h3>Hi Scores</h3>
        <ul>
          <Table 
            columns={columns} 
            dataSource={scores}
            pagination={false}
            // bordered={true}
            // loading={true}
             />
        </ul>
      </div>
    );
  }
}

export default HiScores;
