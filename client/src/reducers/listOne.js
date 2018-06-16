import shortId from 'shortid';
import * as actions from '../actions/indexActions';
import { modifyListItem, insertAfterIndex,  shiftElementsDown, shiftElementsUp } from '../helpers/custom-immutable';

import { undoable } from '../helpers/undoable';

const defaultState = {
  activeTaskId: null,
  blurFormTrigger: false,
  cards: [],
  featureRequests: '',
  focusFormTrigger: false,
  hideCompleted: false,
  hoveredCardId: null,
  listId: null,
  newCardsToTop: false,
  startTime: localStorage.startTime || "12:00pm",
}

const listOne = (state = defaultState, action) => {
  switch(action.type) {
    case actions.ADD_CARD: {
      const newCards = state.newCardsToTop
      ? [  action.newCard, ...state.cards ]
      : [   ...state.cards, action.newCard ];
      const a = [...state.cards, action.newCard];
      const b = [action.newCard, ...state.cards];

      return  {
        ...state,
        cards: newCards,
        newCardsToTop: false,
      };
    }

    case actions.DELETE_ALL: {
      return  {
        ...state,
        cards: [],
      };
    }
    case actions.DELETE_CARD: {
      const { cardId } = action;

      const newCards = state.cards.filter(card => {
        return card.id !== cardId;
      });

      return  {
        ...state,
        cards: newCards,
      };
    }
    case actions.DELETE_COMPLETED: {
      const newCards = state.cards.filter(card => {
        return !card.isCompleted;
      });

      return  {
        ...state,
        cards: newCards,
      };
    }
    case actions.DELETE_SELECTED: {
      const { cardId } = action;

      const newCards = state.cards.filter(card => {
        return !card.isSelected;
      });

      return  {
        ...state,
        cards: newCards,
      };
    }

    case actions.DELETE_HOVERED: {
      const newCards = state.cards.filter(card => {
        return card.id !== state.hoveredCardId;
      });

      return  {
        ...state,
        cards: newCards,
      };
    }
    case actions.COMPLETE_HOVERED: {
      const newCards = state.cards.map(card => {
        return card.id === state.hoveredCardId
          ? Object.assign(card, { isCompleted: !card.isCompleted })
          : card;
      });

      return  {
        ...state,
        cards: newCards,
      };
    }
    case actions.DESELECT_ALL: {
      const newCards = state.cards.map(card => {
        return Object.assign(card, { isSelected: false })
      });

      return  {
        ...state,
        cards: newCards,
      };
    }
    case actions.FETCH_CARDS_SUCCESS: {
      const { cards, listId } = action.payload;

      return  {
        ...state,
        cards,
        listId: state.listId ? state.listId : listId,
      };
    }
    case actions.INSERT_BELOW_SELECTED: {
      const { index, cards } = action;

      const newCards = insertAfterIndex(state.cards, index, cards);

      return  {
        ...state,
        cards: newCards,
      };
    }
    case actions.MOVE_CARD: {
      const { dragIndex, hoverIndex } = action.payload;
      const dragCard = state.cards[dragIndex];
      const newCards = state.cards.splice(0);

      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, dragCard);

      return  {
        ...state,
        cards: newCards,
      };
    }
    case actions.MOVE_CARDS_KEYBOARD: {
      const { key, startIndex, endIndex } = action;

            if (key === 'ARROW_UP') {
        return {
          ...state,
          cards: shiftElementsUp(state.cards, startIndex, endIndex),
        }
      }

      if (key === 'ARROW_DOWN') {
        return {
          ...state,
          cards: shiftElementsDown(state.cards, startIndex, endIndex),
        }
      }

      return state;
    }
  case actions.SET_ACTIVE_TASK:
      return action.newActiveTaskId !== state.activeTaskId
      ? {
        ...state,
        activeTaskId: action.newActiveTaskId
      }
      : state;
  case actions.SET_HOVERED_CARD:
      return  {
        ...state,
        hoveredCardId: action.newHoveredCard
      };
  case actions.TOGGLE_SELECTED: {
    const { cardIndex } = action;
    const newCards = state.cards.map((card, i) => {
      if (cardIndex === i) {
        return Object.assign(card, { isSelected: !card.isSelected });
      }

      return card;
    })

    return  {
      ...state,
      cards: newCards
    };
  }
  case actions.TOGGLE_SELECTED_MULTIPLE: {
    const { startIndex, endIndex } = action;
    const newCards = state.cards.map((card, i) => {
      //
      if ((i >= startIndex) && ( i <= endIndex)) {
        return Object.assign(card, { isSelected: true });
      }

      return card;
    })

    return  {
      ...state,
      cards: newCards
    };
  }
  case actions.TOGGLE_HIDE_COMPLETED:
    return  {
      ...state,
      hideCompleted: !state.hideCompleted
    };
  case actions.TOGGLE_NEW_CARDS_TO_TOP:
    return  {
      ...state,
      newCardsToTop: !state.newCardsToTop
    };
  case actions.TRIGGER_FORM_FOCUS:
    return  {
      ...state,
      focusFormTrigger: !state.focusFormTrigger
    };
  case actions.TRIGGER_FORM_BLUR:
    return  {
      ...state,
      blurFormTrigger: !state.blurFormTrigger
    };
  case actions.TOGGLE_COMPLETED:
  case actions.UNCOMPLETE_ALL: {
    const { matcher, modifier } = action;

    return  {
      ...state,
      cards: modifyListItem(state.cards, matcher, modifier),
    };
  }
  case actions.UPDATE_CARDS:
    return  {
      ...state,
      cards: action.newList
    };
  case actions.UPDATE_FEATURE_REQUESTS:
    return  {
      ...state,
      cards: action.fr
    };
  case actions.UPDATE_CARD_TEXT: {
    const { cardId, newText } = action;
    const newCards = state.cards.map(card => {
      if (card.id === cardId) {
        return Object.assign(card, { text : newText });
      }

      return card;
    })

    return  {
      ...state,
      cards: newCards
    };
  }
  case actions.UPDATE_CARD_DURATION:
    const { cardId, newDuration } = action;
    const newCards = state.cards.map(card => {
      if (card.id === cardId) {
        return Object.assign(card, { duration: newDuration });
      }

      return card;
    })

    return  {
      ...state,
      cards: newCards
    };
  case actions.UPDATE_START_TIME:
    return  {
      ...state,
      startTime: action.newStartTime,
    };
  }
  return state;
}

export const undoableListOne = undoable(listOne);
