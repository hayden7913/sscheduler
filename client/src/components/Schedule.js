import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import shortId from 'shortid';

import SchedgeRow from './SchedgeRow';
import List from './List';

import
{
	addCard,

} from '../actions/indexActions';

import Container from './Container';

class Schedule extends Component {
  renderList = () => {
		const { cards } = this.props;
    return (
			cards.map(card => {
				<TableRow style={{ marginTop: "10px" }}>
		      <TableRowColumn>{card.duration}</TableRowColumn>
		      <TableRowColumn>{card.text}</TableRowColumn>
        </TableRow>
			})
		);
  }

	renderRow = () => (
		<TableRow style={{ marginTop: "10px" }}>
			<TableRowColumn>{'hello'}</TableRowColumn>
			<TableRowColumn>{'world'}</TableRowColumn>
		</TableRow>
	)

	render() {
		const { cards, updateCards } = this.props;

		return (
			<Table>
				<TableBody>
					{this.renderRow}
				</TableBody>
			</Table>
		);
	}
}


const mapStateToProps = (state) => {
	const { listOne } = state;
	const { cards } = listOne;

  return {
		cards
  };
};

export default connect(mapStateToProps, {
	addCard,
})(Schedule);
