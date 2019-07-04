export const updateScore = (payload) => {
  return {
    type: 'UPDATE_SCORE',
    payload,
  }
}

export const addScoreID = (payload) => {
  return {
    type: 'ADD_SCORE_ID',
    payload,
  }
}
