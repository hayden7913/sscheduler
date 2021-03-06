import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import { Card } from 'material-ui/Card';

import EditInlineText from './EditInlineText';

const style = {
	// padding: '0.5rem 1rem',
	padding: "10px",
	margin: '.5rem',
	backgroundColor: 'white',
	cursor: 'move'
};

class TaskCard extends Component {
	render() {
		const { card, isDragging, connectDragSource, connectDropTarget, handleTextChange, handleDelete, handleDurationChange } = this.props;
		const opacity = isDragging ? 0 : 1;

		return connectDragSource(connectDropTarget(
			<div className="card" >
				<Card  style={{ ...style, opacity }}>
					<div className="card-col card-col-1 card-col-text">
						<EditInlineText className="edit-inline edit-text" handleChange={handleTextChange}  text={card.text} />
					</div>
					<div className="card-col card-col-2 card-col-duration">
						<EditInlineText
							className="edit-inline edit-duration"
							handleChange={handleDurationChange}
							text={isNaN(card.duration) ? card.duration : card.duration.toString()}
						/>
					</div>
					<div className="card-col card-col-3 card-col-delete">
						<span className="icon-trash" onClick={handleDelete}></span>
					</div>
				</Card>
			</div>
		));
	}
}

const cardSource = {
	beginDrag(props) {
		return {
			index: props.index,
			listId: props.listId,
			card: props.card
		};
	},

	endDrag(props, monitor) {
		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();

		if ( dropResult && dropResult.listId !== item.listId ) {
			props.removeCard(item.index);
		}
	}
};

const cardTarget = {

	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;
		const sourceListId = monitor.getItem().listId;

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return;
		}

		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

		// Determine mouse position
		const clientOffset = monitor.getClientOffset();

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top;

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return;
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return;
		}

		// Time to actually perform the action
		if ( props.listId === sourceListId ) {
			props.moveCard(dragIndex, hoverIndex);

			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			monitor.getItem().index = hoverIndex;
		}
	}
};

export default flow(
	DropTarget("CARD", cardTarget, connect => ({
		connectDropTarget: connect.dropTarget()
	})),
	DragSource("CARD", cardSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}))
)(TaskCard);
