import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card } from 'material-ui/Card';

import Schedule from './Schedule';

import
{
	addCard,
	deleteCard,
	fetchCards,
	moveCard,
	saveCardState,
	updateCards,
	updateCardText,
	updateCardDuration
} from '../actions/indexActions';

import Container from './Container';

class App extends Component {
	componentDidMount() {
		const { fetchCards } = this.props;

		fetchCards();
	}

	render() {
		const { cards, updateCards } = this.props;

		const style = {
			display: "flex",
			justifyContent: "center",
			paddingTop: "10%",
		}

		return (
	  <MuiThemeProvider>
			<div style={{...style}}>
				<Card>
					<Container id={1} list={cards} {...this.props} />
				</Card>
				<Card style={{ marginLeft: "20px", padding: "10px", width: "300px"}}>
					<Schedule />
				</Card>
			</div>
	  </MuiThemeProvider>
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
  deleteCard,
	fetchCards,
	moveCard,
	saveCardState,
	updateCards,
	updateCardText,
	updateCardDuration,
})(App);
