import * as actions from '../actions/indexActions';

const defaultState = {
  cards: [
    { id: 1, text: "fdsa 1", duration: 20 },
    { id: 2, text: "Item 2", duration: 5 },
    { id: 3, text: "Item 3", duration: 10}
  ]
}

export const listOne = (state = defaultState, action) => {
  switch(action.type) {
    case actions.UPDATE_CARDS:
      return  {
        ...state,
        cards: action.newList
      };

    case actions.UPDATE_CARD_TEXT: {
        const { cardId, newText } = action;
        const newCards = state.cards.map(card => {
          if (card.id === cardId) {
            return Object.assign(card, { text : newText});
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
          return Object.assign(card, { duration: newDuration});
        }

        return card;
      })

      return  {
        ...state,
        cards: newCards
      };
  }
  return state;
}
