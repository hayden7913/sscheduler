import React, { PureComponent } from 'react';
import shortId from 'shortid';
import update from 'react/lib/update';
import { DropTarget } from 'react-dnd';
import { grey } from '../constants/colors';

import { getCummDurationMap, getCummTimeStamp, getMoment, isTimeBetweenInteveral, roundMinutes } from '../helpers/time';

import Card from './Card';
import NewCardForm from './NewCardForm';

class Container extends PureComponent {
	static defaultProps = {
		cards:  []
	}

	constructor(props) {
		super(props);
		this.state = { cards: props.list };
	}

	pushCard(card) {
		this.setState(update(this.state, {
			cards: {
				$push: [ card ]
			}
		}));
	}

	removeCard(index) {
		this.setState(update(this.state, {
			cards: {
				$splice: [
					[index, 1]
				]
			}
		}));
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

	handleTextChange = (cardId) => (newText) => {
		const { updateCardText, saveCardState } = this.props;

		updateCardText(cardId, newText);
		saveCardState();
	}

	handleDurationChange = (cardId) => (newDuration) => {
		const { updateCardDuration, saveCardState } = this.props;

		updateCardDuration(cardId, newDuration);
		saveCardState();
	}

	handleCardClick = (cardIndex) => (evt) => {
		const { toggleSelected } = this.props;
		toggleSelected(cardIndex, evt.ctrlKey);
	}

	handleCardDblClick = (index) => () => {
		const { toggleSelected, triggerFormFocus, saveCardState } = this.props;

		toggleSelected(index);
		triggerFormFocus();
		saveCardState();
	}

	handleDeleteCard = (cardId) => (evt) => {
		const { deleteCard, saveCardState } = this.props;
		evt.stopPropagation();
		deleteCard(cardId);
		saveCardState()
	}

	render() {
		const { addCard, canDrop, cards, isOver, connectDropTarget, saveCardState, startTime } = this.props;

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
					return (
						<Card
							key={card.id}
							index={i}
							listId={this.props.id}
							text={card.text}
							startTime={getCummTimeStamp(startTimeMoment, cummDurationMap[i])}
							duration={card.duration}
							backgroundColor={card.isSelected ? grey : null}
							handleClick={this.handleCardClick}
							handleClick={this.handleCardClick(i)}
							handleDblClick={this.handleCardDblClick(i)}
							handleTextChange={this.handleTextChange(card.id)}
							handleDurationChange={this.handleDurationChange(card.id)}
							handleDelete={this.handleDeleteCard(card.id)}
							removeCard={this.removeCard.bind(this)}
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
