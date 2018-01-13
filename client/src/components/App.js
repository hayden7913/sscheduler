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
import TextArea from './TextArea';

import
{
	addCard,
	deleteCard,
	deselectAll,
	fetchCards,
	moveCard,
	handleKeyDown,
	insertBelowSelected,
	saveCardState,
	setActiveTask,
	toggleCompleted,
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
	constructor() {
		super();
		this.state = {
      isFRVisible: false,
		}
	}
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

  handleStartTimeChange = (cardId ,newStartTime) => {
    const { updateStartTime } = this.props;

    updateStartTime(newStartTime);
  }

	toggleFeatureRequests = () => {
		const { isFRVisible } = this.state;

		this.setState({ isFRVisible: !isFRVisible });
	}

	render() {
		const { addCard, cards, focusFormTrigger, newCardsToTop, saveCardState, toggleNewCardsToTop, startTime  } = this.props;
		const { isFRVisible } = this.state;

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
			marginBottom: "20px",
		}

		return (
	  <MuiThemeProvider>
			<div>
				<div style={{...style}}>
					<div className="left-col-wrapper">
						<Card style={{...formStyle}}>
							<NewCardForm
								addCard={addCard}
								cards={cards}
								focusFormTrigger={focusFormTrigger}
								newCardsToTop={newCardsToTop}
								saveCardState={saveCardState}
							/>
							<Toggle
								label="Add cards to top"
								style={{marginTop: "10px"}}
								onToggle={toggleNewCardsToTop}
								toggled={newCardsToTop}
							/>
						</Card>
						{
							isFRVisible
								 ? <Card  style={{padding: "20px",  width: "221px"}}>
										<TextArea hideTextArea={this.toggleFeatureRequests} />
									</Card>
								: <span onClick={this.toggleFeatureRequests} style={{ cursor: "pointer", color: "#386771", textDecoration: "underline"}}>...Show FR</span>
						}
					</div>
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
	const { activeTaskId, newCardsToTop, focusFormTrigger, cards, startTime } = listOne;

  return {
		activeTaskId,
		cards,
		focusFormTrigger,
		newCardsToTop,
		startTime,
  };
};

export default connect(mapStateToProps, {
	addCard,
  deleteCard,
	deselectAll,
	fetchCards,
	insertBelowSelected,
	handleKeyDown,
	moveCard,
	saveCardState,
	setActiveTask,
	triggerFormFocus,
	toggleNewCardsToTop,
	toggleCompleted,
	toggleSelected,
	updateCards,
	updateCardText,
	updateCardDuration,
	updateStartTime,
})(App);
