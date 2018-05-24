import * as actions from '../actions/indexActions';

const defaultState = {
  isEditingCard: false,
  isFormFocused: false,
}

export const ui = (state = defaultState, action) => {
  switch(action.type) {
    case actions.TOGGLE_IS_EDITING: {
    return {
      ...state,
      isEditingCard: action.isEditingCard,
    };
  }
  case actions.TOGGLE_IS_FORM_FOCUSED: {
    return  {
      ...state,
      isFormFocused: !state.isFormFocused
    };
  }
  default: return state;
  }
}
