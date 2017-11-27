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
      dispatch(fetchCardsSuccess(data));
    })

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
      // .then((res) => {
      //   return res.json();
      // })
      // .then(data => {
      //   alert(JSON.stringify(data));
      // })
  }
}
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
