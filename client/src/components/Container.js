import React, { PureComponent } from 'react';
import repeat from 'repeat';
import shortId from 'shortid';
import update from 'react/lib/update';
import { DropTarget } from 'react-dnd';
import { grey } from '../constants/colors';

import { getCummDurationMap, getCummTimeStamp, getMoment, isTimeBetweenInteveral, roundMinutes } from '../helpers/time';

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
		const { toggleSelected, triggerFormFocus, saveCardState } = this.props;

		toggleSelected(index);
		triggerFormFocus();
		saveCardState();
	}

	handleDeleteCard = (cardId, evt) => {
		const { deleteCard, saveCardState } = this.props;

		evt.stopPropagation();
		deleteCard(cardId);
		saveCardState()
	}

	render() {
		const { activeTaskId, addCard, canDrop, cards, isOver, connectDropTarget, saveCardState, startTime } = this.props;

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

					return (
						<Card
							key={card.id}
							index={i}
							cardId={card.id}
							className={`${isCardActive} ${isCardSelected }`}
							listId={this.props.id}
							text={card.text}
							startTime={getCummTimeStamp(startTimeMoment, cummDurationMap[i])}
							duration={card.duration}
							handleClick={this.handleCardClick}
							handleDblClick={this.handleCardDblClick}
							handleTextChange={this.handleTextChange}
							handleDurationChange={this.handleDurationChange}
							handleDelete={this.handleDeleteCard}
							moveCard={this.moveCard}
						/>
					);
				})}
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
