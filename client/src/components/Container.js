import React, { PureComponent } from 'react';
import repeat from 'repeat';
import shortId from 'shortid';
import update from 'react/lib/update';
import { DropTarget } from 'react-dnd';
import { grey } from '../constants/colors';

import { isEditingCard } from '../helpers/cardHelpers';

import {
  getCummDurationMap,
  getCummTimeStamp,
  getMoment,
  isTimeBetweenInteveral,
  roundMinutes
} from '../helpers/time';

import Card from './Card';
import NewCardForm from './NewCardForm';

class Container extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { cards: props.list };
  }

  static defaultProps = {
    cards:  []
  }

  componentDidMount() {
    const { setActiveTask } = this.props;

    repeat(setActiveTask).every(1000, 'ms').start();
  }

  moveCard = (dragIndex, hoverIndex) => {
    const { updateCards, moveCard, saveCardState } = this.props;
    const { cards } = this.state;
    const dragCard = cards[dragIndex];

    moveCard({
      dragIndex,
      hoverIndex,
    });

    saveCardState();
  }

  handleTextChange = (cardId, newText) => {
    const { updateCardText, saveCardState } = this.props;
    updateCardText(cardId, newText);
    saveCardState();
  }

  handleDurationChange = (cardId, newDuration) => {
    const { updateCardDuration, saveCardState } = this.props;

    updateCardDuration(cardId, newDuration);
    saveCardState();
  }

  handleCardClick = (evt, cardIndex) => {
    const { toggleSelected } = this.props;

    toggleSelected(cardIndex, evt.ctrlKey);
  }

  handleCardDblClick = (index) => {
    const { deselectAll, toggleSelected, triggerFormFocus, saveCardState } = this.props;

    deselectAll();
    toggleSelected(index);
    triggerFormFocus();
    saveCardState();
  }

  handleCardHover = (cardId) => {
    const { setHoveredCard } = this.props;

    setHoveredCard(cardId);
  }

  handleCardUpdate = (cardRef) => {
    const { toggleIsEditing } = this.props;

    toggleIsEditing(isEditingCard(cardRef));
  }

  handleDeleteCard = (cardId, evt) => {
    const { deleteCard, saveCardState } = this.props;

    evt.stopPropagation();
    deleteCard(cardId);
    saveCardState()
  }

  handleTimeClick = (cardId) => {
    const { saveCardState, toggleCompleted } = this.props;

    toggleCompleted(cardId);
    saveCardState();
  }

  render() {
    const {
      activeTaskId,
      addCard,
      canDrop,
      cards ,
      isOver,
      hideCompleted,
      connectDropTarget,
      saveCardState,
      startTime
     } = this.props;

    const isActive = canDrop && isOver;
    const style = {
      width: "350px",
      padding: "10px",
    };

    const startTimeMoment = getMoment(startTime);
    const cummDurationMap = getCummDurationMap(cards);

    return connectDropTarget(
      <div style={{ ...style }}>
        {cards.map((card, i) => {
          const isCardActive = card.id === activeTaskId ? 'is-active' : '';
          const isCardSelected = card.isSelected ? 'is-selected' : '';
          const isCardCompleted = card.isCompleted ? 'is-completed' : '';

          return (
            <Card
              cardId={card.id}
              className={`${isCardActive} ${isCardSelected} ${isCardCompleted}`}
              duration={card.duration}
              handleClick={this.handleCardClick}
              handleCardUpdate={this.handleCardUpdate}
              handleDblClick={this.handleCardDblClick}
              handleDelete={this.handleDeleteCard}
              handleDurationChange={this.handleDurationChange}
              handleHover={this.handleCardHover}
              handleTextChange={this.handleTextChange}
              handleTimeClick={this.handleTimeClick}
              index={i}
              isCompleted={card.isCompleted}
              key={card.id}
              listId={this.props.id}
              moveCard={this.moveCard}
              startTime={getCummTimeStamp(startTimeMoment, cummDurationMap[i])}
              text={card.text}
              textClass={isCardCompleted}
            />
          );
        })
        .filter((card, i) => hideCompleted ? !card.props.isCompleted : true)
      }
      </div>
    );
  }
}

const cardTarget = {
  drop(props, monitor, component ) {
    const { id } = props;
    const sourceObj = monitor.getItem();
    if ( id !== sourceObj.listId ) component.pushCard(sourceObj.card);
    return {
      listId: id
    };
  }
}

export default DropTarget("CARD", cardTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(Container);
