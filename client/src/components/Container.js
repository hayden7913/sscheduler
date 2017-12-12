import React, { Component } from 'react';
import shortId from 'shortid';
import update from 'react/lib/update';
import { DropTarget } from 'react-dnd';
import { grey } from '../constants/colors';

import Card from './Card';
import NewCardForm from './NewCardForm';

class Container extends Component {
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

	moveCard(dragIndex, hoverIndex) {
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
		const { toggleSelected, saveCardState } = this.props;

		toggleSelected(index);
		saveCardState();
	}

	handleDeleteCard = (cardId) => () => {
		const { deleteCard, saveCardState } = this.props;

		deleteCard(cardId);
		saveCardState()
	}

	render() {
		const { cards } = this.props;
		const { addCard, canDrop, isOver, connectDropTarget, saveCardState } = this.props;

		const isActive = canDrop && isOver;
		const style = {
			width: "300px",
			padding: "10px",
		};

		return connectDropTarget(
			<div style={{ ...style }}>
				{cards.map((card, i) => {
					return (
						<Card
							key={card.id}
							index={i}
							listId={this.props.id}
							card={card}
							backgroundColor={card.isSelected ? grey : null}
							handleClick={this.handleCardClick(i)}
							handleDblClick={this.handleCardDblClick(i)}
							handleTextChange={this.handleTextChange(card.id)}
							handleDurationChange={this.handleDurationChange(card.id)}
							handleDelete={this.handleDeleteCard(card.id)}
							removeCard={this.removeCard.bind(this)}
							moveCard={this.moveCard.bind(this)}
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
