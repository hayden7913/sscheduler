import React, { Component } from 'react';
import update from 'react/lib/update';
import { DropTarget } from 'react-dnd';

import Card from './Card';
import NewCardForm from './NewCardForm';

class Container extends Component {

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
		const { updateCards, moveCard } = this.props;
		const { cards } = this.state;
		const dragCard = cards[dragIndex];

		moveCard({
			dragIndex,
			hoverIndex,
		});
	}

	handleTextChange = (cardId) => (newText) => {
		const { updateCardText } = this.props;

		updateCardText(cardId, newText);
	}

	handleDurationChange = (cardId) => (newDuration) => {
		const { updateCardDuration} = this.props;

		updateCardDuration(cardId, newDuration);
	}

	handleDeleteCard = (cardId) => () => {
		const { deleteCard } = this.props;

		deleteCard(cardId);
	}

	render() {
		const { cards } = this.props;
		const { addCard, canDrop, isOver, connectDropTarget, deleteCard, updateCardText } = this.props;

		const isActive = canDrop && isOver;
		const style = {
			width: "200px",
			pading: "5px",
			border: '1px dashed gray',
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
							handleTextChange={this.handleTextChange(card.id)}
							handleDurationChange={this.handleDurationChange(card.id)}
							handleDelete={this.handleDeleteCard(card.id)}
							removeCard={this.removeCard.bind(this)}
							moveCard={this.moveCard.bind(this)}
						/>
					);
				})}
				<NewCardForm addCard={addCard} />
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
