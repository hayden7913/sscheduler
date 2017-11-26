import * as actions from '../actions/indexActions';

const defaultState = {
  cards: [
    { id: 1, text: "fdsa 1" },
    { id: 2, text: "Item 2" },
    { id: 3, text: "Item 3" }
  ]
}

export const listOne = (state = defaultState, action) => {
  switch(action.type) {
    case actions.FETCH_TEST_DATA_SUCCESS:
      return action.testData;
  }
  return state;
}
