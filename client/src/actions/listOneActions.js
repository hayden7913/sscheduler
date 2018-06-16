import shortId from 'shortid';
import moment from 'moment';
import {
  getCummDurationMap,
  isTimeBetweenInteveral,
  getMinutesPastCurrentTask,
  getTimeInMinutes,
} from '../helpers/time';
import { getActiveTaskIndex, getCardIndexById } from '../helpers/cardHelpers';
import { findIndices, filterConsec } from '../helpers/custom-immutable';

const keymap = {
  17: 'CONTROL',
  27: 'ESCAPE',
  38: 'ARROW_UP',
  40: 'ARROW_DOWN',
  67: 'C',
  68: 'D',
  69: 'E',
  78: 'N',
  88: 'X',
  89: 'Y',
  90: 'Z',
};

const readFile = (evt) => {
  return new Promise(resolve => {
    const file = evt.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      resolve(reader.result)
    }

    reader.readAsText(file);
  });
}

const assignIdsToCards = (cards) => cards.map(card => {
  if (!card.id) {
    return Object.assign(card, { id: shortId.generate() })
  }

  return card || {};
});

export const autoAdjustDuration = (cardIndex) => (dispatch, getState) => {
  const { cards, startTime } = getState().listOne.present;
  const card = cards[cardIndex];
  const cummDurationMap = getCummDurationMap(cards);
  const activeTaskIndex = getActiveTaskIndex(startTime)(cummDurationMap);

  const adjustmentValue = getMinutesPastCurrentTask(
    cummDurationMap[activeTaskIndex],
    getTimeInMinutes(moment().format('h:mma')),
    getTimeInMinutes(startTime)
  );

  dispatch({
    type: 'UPDATE_CARD_DURATION',
    newDuration: Number(card.duration) + adjustmentValue,
    cardId: card.id,
  });
}
export const ADD_CARD = 'ADD_CARD';
export const INSERT_BELOW_SELECTED = 'INSERT_BELOW_SELECTED';
export const addCard = (newCard) => {
  return (dispatch, getState) => {
    const cards = getState().listOne.present.cards;
    const selectedCardIndices = findIndices(cards, (card) => card.isSelected);

    if (selectedCardIndices.length === 0 ) {
      return dispatch({
        type: 'ADD_CARD',
        newCard
      });
    }

    const endIndex = selectedCardIndices[selectedCardIndices.length - 1];
    return dispatch({
      type: 'INSERT_BELOW_SELECTED',
      index: endIndex,
      newCard: Object.assign(newCard, { isSelected: true})
    });
  }
}

export const DESELECT_ALL = 'DESELECT_ALL';
export const deselectAll = () => (dispatch) => {
  dispatch({
    type: 'DESELECT_ALL',
  });
};

export const DELETE_CARD = 'DELETE_CARD';
export const deleteCard = (cardId) => ({
  type: 'DELETE_CARD',
  cardId
});

export const DELETE_COMPLETED = 'DELETE_COMPLETED';
export const deleteCompleted= () => dispatch => {
  dispatch({
    type: 'DELETE_COMPLETED',
  })

  dispatch(saveCardState());
};

export const DELETE_ALL = 'DELETE_ALL';
export const deleteAll = () => dispatch => {
  dispatch({
    type: 'DELETE_ALL',
  })

  dispatch(saveCardState());
};

export const importCards = (evt) => (dispatch) => {
  readFile(evt).then(cardsFile => {
    const cards = JSON.parse(cardsFile)
    const cardsWithIds = assignIdsToCards(cards);

    dispatch(fetchCardsSuccess({ cards }));
    dispatch(saveCardState());
  });
}

export const MOVE_CARD = 'MOVE_CARD';
export const moveCard = (payload) => ({
  type: 'MOVE_CARD',
  payload
});

export const MOVE_CARDS_KEYBOARD = 'MOVE_CARDS_KEYBOARD';
export const moveCardsKeyboard = (key) => {
  return (dispatch, getState) => {
    const cards = getState().listOne.present.cards;
    let selectedIndices = findIndices(cards, (card) => card.isSelected);
    let startIndex, endIndex;

    if (selectedIndices.length > 1) {
      selectedIndices = filterConsec(selectedIndices);
      startIndex = selectedIndices[0];
      endIndex = selectedIndices[selectedIndices.length - 1];
    } else {
      startIndex = endIndex = selectedIndices[0];
    }

    if (startIndex == undefined) {
      console.error('move indices undefined')
      return null;
    }

    return dispatch(({
      type: 'MOVE_CARDS_KEYBOARD',
      key,
      startIndex,
      endIndex,
    }));
  }
}

export const FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS';
export const fetchCardsSuccess = (payload) => ({
  type: 'FETCH_CARDS_SUCCESS',
  payload,
});

export const TRIGGER_FORM_FOCUS = 'TRIGGER_FORM_FOCUS';
export const triggerFormFocus = () => ({
  type: 'TRIGGER_FORM_FOCUS',
});

export const TRIGGER_FORM_BLUR = 'TRIGGER_FORM_BLUR';
export const triggerFormBlur= () => ({
  type: 'TRIGGER_FORM_BLUR',
});

export const DELETE_SELECTED = 'DELETE_SELECTED';
export const DELETE_HOVERED = 'DELETE_HOVERED';
export const COMPLETE_HOVERED = 'COMPLETE_HOVERED';
export const UNDO = 'UNDO';
export const REDO = 'REDO';

const  advanceHoveredCard = () => (dispatch, getState) => {
  const { cards, hoveredCardId } = getState().listOne.present;
  const cardIndex = getCardIndexById(cards)(hoveredCardId);

  setHoveredCard(cards[cardIndex + 1].id);
}

export const handleKeyDown = (evt) => {
  return (dispatch, getState) => {
    const evtobj = window.event? event : evt;
    const keycode = evtobj.keyCode;
    const key = keymap[keycode];

    switch(key) {
      case 'ARROW_UP':
      case 'ARROW_DOWN':
        dispatch(moveCardsKeyboard(key, evt));
        dispatch(saveCardState());
      break;
      case 'ESCAPE':
        dispatch(deselectAll());
        dispatch(triggerFormBlur());
      break;
      case 'C':
      case 'D':
        const { isEditingCard, isFormFocused } = getState().ui;
        if (!isEditingCard && ! isFormFocused) {
          if (key === 'C') {
            dispatch(advanceHoveredCard());
            dispatch({
              type: 'DELETE_HOVERED'
            });

          }

          if (key === 'D') {
            dispatch({
              type: 'COMPLETE_HOVERED',
            });
          }

          dispatch(saveCardState());
        }
        break;
      case 'E':
        if (evtobj.ctrlKey) {
          evtobj.preventDefault();
          evtobj.stopPropagation();
          dispatch(triggerFormFocus());
        }
      case 'X':
        if (evtobj.ctrlKey) {
          dispatch({
            type: 'DELETE_SELECTED',
          });

          dispatch(saveCardState());
        }
      break;
      case 'Y':
        if (evtobj.ctrlKey) {
          dispatch({
            type: 'REDO',
          });

          dispatch(saveCardState());
        }
      break;
      case 'Z':
        if (evtobj.ctrlKey) {
          dispatch({
            type: 'UNDO',
          });

          dispatch(saveCardState());
        }
      break;
    }
  }
}

export function fetchCards() {
  return (dispatch) => {
    fetch('cards')
    .then((res) => {
      return res.json();
    })
    .then(data => {
      if (data.length === 0) {
        return null;
      }

      const cardsWithIds = assignIdsToCards(data[0].cards) ;

      dispatch(fetchCardsSuccess({
        listId: data[0]._id,
        cards: cardsWithIds,
      }));
    });
  }
}

export function saveCardState() {
  return (dispatch, getState) => {
    const { cards, listId } = getState().listOne.present;

    fetch(`/cards/${listId}`, {
        method: 'put',
        body: JSON.stringify({ cards }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
  }
}

export const SET_ACTIVE_TASK = 'SET_ACTIVE_TASK';

export function setActiveTask() {
  return (dispatch, getState) => {
    let newActiveTaskId;
    const { activeTaskId, cards, startTime  } = getState().listOne.present;
    const cummDurationMap = getCummDurationMap(cards);

    const activeIndex = getActiveTaskIndex(startTime)(cummDurationMap);

    if ((activeIndex === -1) && (cards.length > 0)) {
      newActiveTaskId = cards[0].id;
    }

    if ((activeIndex > -1) && (cards[activeIndex].id !== activeTaskId)) {
        newActiveTaskId = cards[activeIndex].id
    }

    if (newActiveTaskId) {
      dispatch({
        type: 'SET_ACTIVE_TASK',
        newActiveTaskId,
      });
    }
  }
}

export const SET_HOVERED_CARD = 'SET_HOVERED_CARD';
export const setHoveredCard = (newHoveredCard) => ({
  type: 'SET_HOVERED_CARD',
  newHoveredCard,
});

export const TOGGLE_COMPLETED = 'TOGGLE_COMPLETED';
export function toggleCompleted(cardId) {
  return (dispatch, getState) => {
    const matcher = (card, i) =>  cardId === card.id;
    const modifier = card => Object.assign({}, card, { isCompleted: !card.isCompleted });

    dispatch({
      type: 'TOGGLE_COMPLETED',
      matcher,
      modifier,
    })
  }
}

export const TOGGLE_SELECTED = 'TOGGLE_SELECTED';
export const TOGGLE_SELECTED_MULTIPLE = 'TOGGLE_SELECTED_MULTIPLE';
export const toggleSelected = (cardIndex, shouldToggleMultiple) => {
  return (dispatch, getState) => {
    if (shouldToggleMultiple) {
      const cards = getState().listOne.present.cards;
      let selectedCardIndices = findIndices(cards, (card) => card.isSelected);
      selectedCardIndices = [...selectedCardIndices, cardIndex].sort((a, b) => a - b);

      const startIndex = selectedCardIndices[0];
      const endIndex = selectedCardIndices[selectedCardIndices.length - 1];

      return dispatch({
        type: 'TOGGLE_SELECTED_MULTIPLE',
        startIndex,
        endIndex,
      });
    }

    return dispatch({ type: 'TOGGLE_SELECTED', cardIndex })
  }
}

export const TOGGLE_NEW_CARDS_TO_TOP = 'TOGGLE_NEW_CARDS_TO_TOP';
export const toggleNewCardsToTop= () => ({
  type: 'TOGGLE_NEW_CARDS_TO_TOP',
});

export const TOGGLE_HIDE_COMPLETED = 'TOGGLE_HIDE_COMPLETED';
export const toggleHideCompleted= () => ({
  type: 'TOGGLE_HIDE_COMPLETED',
});

export const TOGGLE_IS_FORM_FOCUSED = 'TOGGLE_IS_FORM_FOCUSED';
export const toggleIsFormFocused = () => ({
  type: 'TOGGLE_IS_FORM_FOCUSED',
});

export const UNCOMPLETE_ALL = 'UNCOMPLETE_ALL';
export const uncompleteAll = (matcher, modifier) => (dispatch) => {
  dispatch({
    type: 'UNCOMPLETE_ALL',
    matcher: (card) => card.isCompleted,
    modifier: (card) => Object.assign(card, { isCompleted: false }),
  });

  dispatch(saveCardState());
};

export const UPDATE_CARDS = 'UPDATE_CARDS';
export const updateCards = (newList) => ({
  type: 'UPDATE_CARDS',
  newList
});


export const UPDATE_CARD_TEXT = 'UPDATE_CARD_TEXT';
export const updateCardText= (cardId, newText) => ({
  type: 'UPDATE_CARD_TEXT',
  cardId,
  newText,
});


export const UPDATE_CARD_DURATION = 'UPDATE_CARD_DURATION';
export const updateCardDuration = (cardId, newDuration) => ({
  type: 'UPDATE_CARD_DURATION',
  cardId,
  newDuration,
});

export const UPDATE_FEATURE_REQUESTS = 'UPDATE_FEATURE_REQUESTS';
export const updateFeatureRequests = (updatedFeatures, frId) => () =>  {
  fetch(`/cards/${frId}`, {
    method: 'put',
    body: JSON.stringify({ featureRequests: updatedFeatures }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
}

export const UPDATE_START_TIME = 'UPDATE_START_TIME';
export function updateStartTime(newStartTime) {
  return (dispatch, getState) => {
    localStorage.startTime = newStartTime;

    return dispatch({
      type: 'UPDATE_START_TIME',
      newStartTime,
    });
  }
}
