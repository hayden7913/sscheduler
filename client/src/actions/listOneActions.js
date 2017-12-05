import shortId from 'shortid';
import { getCummDurationMap, isTimeBetweenInteveral } from '../helpers/time';

export const ADD_CARD = 'ADD_CARD';
export const addCard = (newCard) => ({
  type: 'ADD_CARD',
  newCard
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

export const FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS';
export const fetchCardsSuccess = (payload) => ({
  type: 'FETCH_CARDS_SUCCESS',
  payload,
});

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
      // console.log(cards[activeIndex]);
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

export const INSERT_CARD_BELOW = 'INSERT_CARD_BELOW';
export const insertCardBelow = (index, newCard) => ({
  type: 'INSERT_CARD_BELOW',
  index,
  newCard,
});

export const TOGGLE_SELECTED = 'TOGGLE_SELECTED';
export const toggleSelected= (cardId) => ({
  type: 'TOGGLE_SELECTED',
  cardId
});

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
