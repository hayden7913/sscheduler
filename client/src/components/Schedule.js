import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import repeat from 'repeat';
import shortId from 'shortid';
import { Card } from 'material-ui/Card';
import store from '../redux-files/store';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

import { getCummDurationMap, getCummTimeStamp, getMoment, isTimeBetweenInteveral, roundMinutes } from '../helpers/time';
import {
  setActiveTask,
	updateStartTime,
} from '../actions/indexActions';

import Container from './Container';
import EditInlineText from './EditInlineText';

class Schedule extends Component {
  componentDidMount() {
    const { setActiveTask } = this.props;

    repeat(setActiveTask).every(1000, 'ms').start();
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
		const { activeTaskId, cards, updateCards, startTime } = this.props;
    const startTimeMoment = getMoment(startTime);
    const cummDurationMap = getCummDurationMap(cards);
    const durationColWidth = "220px";

		return (
			<Card style={{ marginLeft: "20px", padding: "10px", width: "375px",  maxHeight: "85vh"}}>
        <div style={{ marginLeft: "21px" }}>
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
            style={{marginLeft: "30px", marginBottom: "10px", width: "50px"}}
          />
        </div>
        <div style={{ maxHeight: "76vh", overflowY: "auto"}}>
          <Table>
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
              style={{tableLayout: "fixed", width: durationColWidth}}
            >
              <TableRow>
                <TableHeaderColumn>Duration</TableHeaderColumn>
                <TableHeaderColumn>Task</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
            >
              {cards.map((card, index) => {
                return (
                  <TableRow
                    style={activeTaskId === card.id ? {backgroundColor: '#E8F5E9'} : {backgroundColor: 'transparent'}}
                    key={index}
                  >
                    <TableRowColumn>{getCummTimeStamp(startTimeMoment, cummDurationMap[index])}</TableRowColumn>
                    <TableRowColumn style={{tableLayout: "fixed", width: durationColWidth }}>{card.text}</TableRowColumn>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
			</Card>
		);
	}
}

const mapStateToProps = (state) => {
	const { listOne } = state;
	const { activeTaskId, cards, startTime } = listOne;

  return {
    activeTaskId,
		cards,
    startTime,
  };
};

export default connect(mapStateToProps, {
  setActiveTask,
	updateStartTime,
})(Schedule);
