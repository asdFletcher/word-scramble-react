import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

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
    userScore: state.userScore,
    userName: state.userName,
    userIsTopTen: state.userIsTopTen,
    id: state.id,
  };
};

const ScoreReport = (props) => {
  let { userIsTopTen, userName, userScore } = props;
  let userData = [{
    name: userName,
    score: userScore,
  }];
  if (!userIsTopTen && props.id !== 0) {
    return (
      <Table
      className={'score-report-table'}
      columns={columns} 
      dataSource={userData}
      pagination={false}
      rowClassName={ (record) => record.className}
     />
    );
  } else {
    return null;
  }
};

export default connect(mapStateToProps)(ScoreReport);