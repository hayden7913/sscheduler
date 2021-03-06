import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card } from 'material-ui/Card';
import Clock from 'react-live-clock';
import Toggle from 'material-ui/Toggle';

import NewCardForm from './NewCardForm';
import Schedule from './Schedule';

import
{
	addCard,
	deleteCard,
	fetchCards,
	moveCard,
	saveCardState,
	toggleNewCardsToTop,
	updateCards,
	updateCardText,
	updateCardDuration
} from '../actions/indexActions';

import Container from './Container';

class App extends Component {
	componentDidMount() {
		const { fetchCards } = this.props;

		fetchCards();

		if (!localStorage.startTime) {
			localStorage.startTime = "12:00pm";
		}
	}

	render() {
		const { addCard, cards, saveCardState, toggleNewCardsToTop  } = this.props;

		const style = {
			display: "flex",
			justifyContent: "center",
			paddingTop: "7%",
		}

		const clockStyle = {
			textAlign: "center",
			padding: "10px",
			paddingTop: "12px",
			height:"50px",
			display: "block",
			width: "100px",
			marginLeft: "20px",
			fontSize: "20px",
		};

		const formStyle = {
			borderRadius: "2px",
	    zIndex: "1",
	    height: "205px",
	    padding: "10px",
	    width: "300px",
	    marginRight: "20px",
		}

		return (
	  <MuiThemeProvider>
			<div>
				<div style={{...style}}>
					<Card style={{...formStyle}}>
						<NewCardForm  addCard={addCard} saveCardState={saveCardState} />
						<Toggle
							label="Add cards to top"
							style={{marginTop: "10px"}}
							onToggle={toggleNewCardsToTop}
						/>
					</Card>
					<Card style={{maxHeight: "85vh", overflowY: "auto"}}>
						<Container id={1} list={cards} {...this.props} />
					</Card>
						<Schedule />
					<Card style={{ ...clockStyle }}>
						<Clock format={'h:mm a'} ticking={true} timezone={'US/Pacific'} />
					</Card>
				</div>
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
	toggleNewCardsToTop,
	updateCards,
	updateCardText,
	updateCardDuration,
})(App);
