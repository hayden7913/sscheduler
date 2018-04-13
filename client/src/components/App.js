import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import { connect } from 'react-redux';
import FileSaver from 'file-saver';
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

import {
  addCard,
  deleteCard,
  deselectAll,
  fetchCards,
  moveCard,
  handleKeyDown,
  insertBelowSelected,
  importCards,
  saveCardState,
  setActiveTask,
  toggleCompleted,
  toggleHideCompleted,
  toggleSelected,
  toggleNewCardsToTop,
  triggerFormFocus,
  updateCards,
  updateCardText,
  updateCardDuration,
  updateStartTime,
} from '../actions/indexActions';

import Container from './Container';

const exportCards =  cards =>  {
  const stringifiedCards = JSON.stringify(cards);
  var blob = new Blob([stringifiedCards], {type: "application/json"});
  FileSaver.saveAs(blob, "untitled.json");
}

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

  handleExportClick = () => {
    const { cards } = this.props;

    exportCards(cards);
  }

  handleNowButtonClick = () => {
    const { updateStartTime } = this.props;
    const newTime = roundMinutes(moment().format('h:mm a'), 5);

    updateStartTime(newTime);
  }

  handleFileSelect = (evt) => {
    const file = evt.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      console.log(evt.target.result)
    }

    reader.readAsText(file);
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
    const {
      addCard,
      cards,
      importCards,
      focusFormTrigger,
      newCardsToTop,
      saveCardState,
      toggleHideCompleted,
      toggleNewCardsToTop,
      startTime
    } = this.props;

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
      height: "225px",
      padding: "10px",
      width: "221px",
      marginRight: "20px",
      marginBottom: "20px",
    }

    return (
    <MuiThemeProvider>
      <div>
        <input
          onChange={importCards}
          type="file"
          name="files"
        />
        <button
          onClick={this.handleExportClick}
        >
          Export
        </button>

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
              <Toggle
                label="Hide completed"
                style={{marginTop: "10px"}}
                onToggle={toggleHideCompleted}
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
  const { activeTaskId, newCardsToTop, focusFormTrigger, cards, hideCompleted, startTime } = listOne;

  return {
    activeTaskId,
    cards,
    focusFormTrigger,
    hideCompleted,
    newCardsToTop,
    startTime,
  };
};

export default connect(mapStateToProps, {
  addCard,
  deleteCard,
  deselectAll,
  fetchCards,
  importCards,
  insertBelowSelected,
  handleKeyDown,
  moveCard,
  saveCardState,
  setActiveTask,
  triggerFormFocus,
  toggleNewCardsToTop,
  toggleCompleted,
  toggleHideCompleted,
  toggleSelected,
  updateCards,
  updateCardText,
  updateCardDuration,
  updateStartTime,
})(App);
