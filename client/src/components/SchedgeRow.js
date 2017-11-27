import React from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';

export default function SchedgeRow({ startTime, task }) {
  return (
    <TableRow style={{ marginTop: "10px" }}>
      <TableRowColumn>{startTime}</TableRowColumn>
      <TableRowColumn>{task}</TableRowColumn>
    </TableRow>
  );
}
