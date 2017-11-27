import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';

import { addCard, updateCards, updateCardText, updateCardDuration } from '../actions/indexActions';

import Container from './Container';

class App extends Component {

	render() {
		const { cards, updateCards } = this.props;
		const style = {
			display: "flex",
			justifyContent: "space-around",
			paddingTop: "20px"
		}
		console.log(cards)
		return (
			<div style={{...style}}>
				<Container id={1} list={cards} {...this.props} />
			</div>
		);
	}
}

App = DragDropContext(HTML5Backend)(App);

const mapStateToProps = (state) => {
	const { listOne } = state;
	const { cards } = listOne;

  return {
		cards
  };
};

export default connect(mapStateToProps, {
	addCard,
	updateCards,
	updateCardText,
	updateCardDuration,
})(App);
