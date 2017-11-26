import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from './Container';

class App extends Component {

	render() {
		const { cards } = this.props;

		const style = {
			display: "flex",
			justifyContent: "space-around",
			paddingTop: "20px"
		}

		const listOne = [
			{ id: 1, text: "fdsa 1" },
			{ id: 2, text: "Item 2" },
			{ id: 3, text: "Item 3" }
		];

		return (
			<div style={{...style}}>
				<Container id={1} list={cards} />
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

export default connect(mapStateToProps)(App);
