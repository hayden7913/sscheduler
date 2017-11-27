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
export const updateCardDuration = (cardId, newText) => ({
  type: 'UPDATE_CARD_DURATION',
  cardId,
  newText,
});
