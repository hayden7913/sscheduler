import * as actions from '../actions/indexActions';

const defaultState = {
  cards: []
}

export const listOne = (state = defaultState, action) => {
  switch(action.type) {
    case actions.FETCH_TEST_DATA_SUCCESS:
      return action.testData;
  }
  return state;
}
