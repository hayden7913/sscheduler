import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import moment from 'moment';

import { Card } from 'material-ui/Card';
import Clock from 'react-live-clock';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';

import { roundMinutes } from '../helpers/time';

import EditInlineText from './EditInlineText';
import NewCardForm from './NewCardForm';

import
{
	addCard,
	deleteCard,
	fetchCards,
	moveCard,
	handleKeyDown,
	insertBelowSelected,
	saveCardState,
	setActiveTask,
	toggleSelected,
	toggleNewCardsToTop,
	triggerFormFocus,
	updateCards,
	updateCardText,
	updateCardDuration,
	updateStartTime,
} from '../actions/indexActions';

import Container from './Container';

class App extends Component {
	componentDidMount() {
		const { fetchCards, handleKeyDown } = this.props;

		document.onkeydown = handleKeyDown;
		fetchCards();
	}

  handleNowButtonClick = () => {
    const { updateStartTime } = this.props;
    const newTime = roundMinutes(moment().format('h:mm a'), 5);

    updateStartTime(newTime);
  }

  handleStartTimeChange = (newStartTime) => {
    const { updateStartTime } = this.props;

    updateStartTime(newStartTime);
  }

	render() {
		const { addCard, cards, focusFormTrigger, saveCardState, toggleNewCardsToTop, startTime  } = this.props;

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
			width: "100%",
			fontSize: "20px",
		};

		const formStyle = {
			borderRadius: "2px",
	    zIndex: "1",
	    height: "205px",
	    padding: "10px",
	    width: "221px",
	    marginRight: "20px",
		}

		return (
	  <MuiThemeProvider>
			<div>
				<div style={{...style}}>
					<Card style={{...formStyle}}>
						<NewCardForm  addCard={addCard} cards={cards} focusFormTrigger={focusFormTrigger} saveCardState={saveCardState} />
						<Toggle
							label="Add cards to top"
							style={{marginTop: "10px"}}
							onToggle={toggleNewCardsToTop}
						/>
					</Card>
					<Card style={{maxHeight: "85vh", overflowY: "auto", backgroundColor: "#e2e4e6" }}>
						<Container id={1} list={cards} {...this.props} />
					</Card>
					<div className="widget-bar-right" style={{ marginLeft: "20px", width: "150px" }}>
						<Card style={{ ...clockStyle }}>
							<Clock format={'h:mm a'} ticking={true} timezone={'US/Pacific'} />
						</Card>
						<Card className='start-time-widget' style={{ padding: '10px', width: '100%', marginTop: '30px', textAlign: 'center' }}>
							<span>Start Time: </span>
							<EditInlineText
								className="edit-inline edit-duration"
								handleChange={this.handleStartTimeChange}
								text={startTime}
							/>
							<RaisedButton
								type="button"
								label="Now"
								onClick={this.handleNowButtonClick}
								style={{ marginTop: "10px", marginBottom: "10px", width: "50px"}}
							/>
						</Card>
					</div>
				</div>
			</div>
	  </MuiThemeProvider>
		);
	}
}

App = DragDropContext(HTML5Backend)(App);

const mapStateToProps = (state) => {
	const { listOne } = state;
	const { activeTaskId, focusFormTrigger, cards, startTime } = listOne;

  return {
		activeTaskId,
		cards,
		focusFormTrigger,
		startTime,
  };
};

export default connect(mapStateToProps, {
	addCard,
  deleteCard,
	fetchCards,
	insertBelowSelected,
	handleKeyDown,
	moveCard,
	saveCardState,
	setActiveTask,
	triggerFormFocus,
	toggleNewCardsToTop,
	toggleSelected,
	updateCards,
	updateCardText,
	updateCardDuration,
	updateStartTime,
})(App);
