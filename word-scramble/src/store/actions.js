export const updateScore = (payload) => {
  return {
    type: 'UPDATE_SCORE',
    payload,
  };
};

export const addScoreID = (payload) => {
  return {
    type: 'ADD_SCORE_ID',
    payload,
  };
};

export const updateIsTopTen = (payload) => {
  return {
    type: 'UPDATE_IS_TOP_TEN',
    payload,
  };
};

export const updateUserName = (payload) => {
  return {
    type: 'UPDATE_USER_NAME',
    payload,
  };
};

export const updateScoresFromDB = (payload) => {
  return {
    type: 'UPDATE_SCORES_FROM_DB',
    payload,
  };
};

export const updateScoresLoading = (payload) => {
  return {
    type: 'UPDATE_SCORES_LOADING',
    payload,
  };
};