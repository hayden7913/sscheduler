import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import shortId from 'shortid';

import { getCummTimeStamp, getMoment } from '../helpers/time';

import EditInlineText from './EditInlineText';

import {
	updateStartTime,
} from '../actions/indexActions';

import Container from './Container';

class Schedule extends Component {
  getCummDurationMap() {
    const { cards } = this.props;
    const durationMap = [0];

    if (cards.length === 0) {
      return [];
    }

    durationMap.push(cards[0].duration)

    cards.map(card => parseInt(card.duration))
    .reduce((a, b) => {
      durationMap.push(a+b);
      return a + b;
    });

    return durationMap;
  };

  handleStartTimeChange = (newStartTime) => {
    const { updateStartTime } = this.props;

    updateStartTime(newStartTime);
  }


	render() {
		const { cards, updateCards, startTime } = this.props;

    const startTimeMoment = getMoment(startTime);
    const cummDurationMap = this.getCummDurationMap();

		return (
  		<div>
        <div style={{marginLeft: "21px"}}>
          <span>Start Time: </span>
						<EditInlineText
							className="edit-inline edit-duration"
							handleChange={this.handleStartTimeChange}
							text={startTime}
						/>
        </div>
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>Duration</TableHeaderColumn>
              <TableHeaderColumn>Task</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
          >
            {cards.map( (card, index) => (
              <TableRow key={index}>
                <TableRowColumn>{getCummTimeStamp(startTimeMoment, cummDurationMap[index])}</TableRowColumn>
                <TableRowColumn style={{tableLayout: "fixed", width: "128px"}}>{card.text}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
			</div>
		);
	}
}


const mapStateToProps = (state) => {
	const { listOne } = state;
	const { cards, startTime } = listOne;

  return {
		cards,
    startTime,
  };
};

export default connect(mapStateToProps, {
	updateStartTime,
})(Schedule);
