import shortId from 'shortid';
import { getCummDurationMap, isTimeBetweenInteveral } from '../helpers/time';
import { findIndices, filterConsec } from '../helpers/custom-immutable';

const keymap = {
  17: 'CONTROL',
  27: 'ESCAPE',
  38: 'ARROW_UP',
  40: 'ARROW_DOWN',
  68: 'D',
  78: 'N',
}


export const ADD_CARD = 'ADD_CARD';
export const INSERT_BELOW_SELECTED = 'INSERT_BELOW_SELECTED';
export const addCard = (newCard) => {
  return (dispatch, getState) => {
    const cards = getState().listOne.cards;
    const selectedCardIndices = findIndices(cards, (card) => card.isSelected);

    if (selectedCardIndices.length === 0 ) {
      return dispatch({
        type: 'ADD_CARD',
        newCard
      })
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
export const deselectAll = () => ({
  type: 'DESELECT_ALL',
});

export const DELETE_CARD = 'DELETE_CARD';
export const deleteCard = (cardId) => ({
  type: 'DELETE_CARD',
  cardId
});

export const MOVE_CARD = 'MOVE_CARD';
export const moveCard = (payload) => ({
  type: 'MOVE_CARD',
  payload
});

export const MOVE_CARDS_KEYBOARD = 'MOVE_CARDS_KEYBOARD';
export const moveCardsKeyboard = (key) => {
  return (dispatch, getState) => {
    const cards = getState().listOne.cards;
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

export const DELETE_SELECTED = 'DELETE_SELECTED';
export const handleKeyDown = (evt) => {
  return (dispatch, getState) => {
    const evtobj = window.event? event : evt;
    const keycode = evtobj.keyCode;

    const key = evtobj.ctrlKey && keycode === 88
    ? 'CTRL+X'
    : keymap[keycode];

    switch(key) {
      case 'ARROW_UP':
      case 'ARROW_DOWN':
        dispatch(moveCardsKeyboard(key, evt));
      break;
      case 'ESCAPE':
        dispatch(deselectAll());
      break;
      case 'CTRL+X':
        dispatch({
          type: 'DELETE_SELECTED',
        });
      break;
      case 'N':
        dispatch(triggerFormFocus());
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

      const cardsWithIds = data[0].cards.map(card => {
        if (!card.id) {
          return Object.assign(card, { id: shortId.generate() })
        }

        return card;
      })
      dispatch(fetchCardsSuccess({
        listId: data[0]._id,
        cards: cardsWithIds,
      }));
    });
  }
}

export function saveCardState() {
  return (dispatch, getState) => {
    const { cards, listId } = getState().listOne;
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
    const { activeTaskId, cards, startTime  } = getState().listOne;
    const cummDurationMap = getCummDurationMap(cards);

    const activeIndex = cummDurationMap.findIndex((cummDuration, index) => {
      return isTimeBetweenInteveral(startTime, cummDuration, cummDurationMap[index + 1]);
    });


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

export const TOGGLE_SELECTED = 'TOGGLE_SELECTED';
export const TOGGLE_SELECTED_MULTIPLE = 'TOGGLE_SELECTED_MULTIPLE';
export const toggleSelected = (cardIndex, shouldToggleMultiple) => {
  return (dispatch, getState) => {
    if (shouldToggleMultiple) {
      const cards = getState().listOne.cards;
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
