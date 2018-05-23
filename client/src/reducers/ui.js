import * as actions from '../actions/indexActions';

const defaultState = {
  isEditingCard: false,
}

export const ui = (state = defaultState, action) => {
  switch(action.type) {
    case actions.TOGGLE_IS_EDITING: {
    return {
      ...state,
      isEditingCard: action.isEditingCard,
    };
  }
  default: return state;
  }
}
