const initialState = {
  userName: '',
  userScore: 0,
  userIsTopTen: false,
  id: 0,
  topTenScores: [],
  scoresLoading: false,
};

export default (state = initialState, action) => {
  let  { type, payload } = action;
  switch (type) {
    case 'UPDATE_SCORE': {
      let newState = {
        ...state,
        userScore: payload,
      }
      return newState;
    }
    case 'ADD_SCORE_ID': {
      let newState = {
        ...state,
        id: payload,
      }
      return newState;
    }
    case 'UPDATE_IS_TOP_TEN': {
      let newState = {
        ...state,
        userIsTopTen: payload,
      }
      return newState;
    }
    case 'UPDATE_USER_NAME': {
      let newState = {
        ...state,
        userName: payload,
      }
      return newState;
    }
    case 'UPDATE_SCORES_FROM_DB': {
      let newState = {
        ...state,
        topTenScores: payload,
      }
      return newState;
    }
    case 'UPDATE_SCORES_LOADING': {
      let newState = {
        ...state,
        scoresLoading: payload,
      }
      return newState;
    }
    default: {
      return state;
    }
  }
}
