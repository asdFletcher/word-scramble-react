import React from 'react';
import { Table } from 'antd';
import '../../node_modules/antd/dist/antd.css';

const data = [
  {
    key: '1',
    name: 'John Brown',
    score: 32,
  },
  {
    key: '2',
    name: 'Jim Green',
    score: 42,
  },
  {
    key: '3',
    name: 'Joe Black',
    score: 32,
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
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
      let data = await res.json()
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
      <>
        <h3>Hi Scores</h3>
        <ul>
          {/* {scores && scores.map((score, index) => {
            return (
              <li key={index}>
                <span>{index + 1}.) </span>
                <span>{score.name} </span>
                <span>{score.score}</span>
              </li>
            );
          })} */}
          {/* <Table columns={this.getColumns()} dataSource={scores && scores} /> */}
          <Table 
            columns={columns} 
            dataSource={scores}
            pagination={false} />
        </ul>
      </>
    );
  }
}

export default HiScores;
