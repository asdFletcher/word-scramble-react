const initialState = {
  score: 0,
};

export default (state = initialState, action) => {
  let  { type, payload } = action;
  switch (type) {
    case 'UPDATE_SCORE': {
      let newState = {
        ...state,
        score: payload,
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
    default: {
      return state;
    }
  }
}
