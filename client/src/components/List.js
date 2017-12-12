import React from 'react';
import PropTypes from 'prop-types';
import { TableBody } from 'material-ui/Table';

export default function List(props) {
  const { children, className, items, renderItem } = props;

  const list = items && items.map(renderItem);

  return (
    <TableBody>
      {list}
    </TableBody>
  );
}

List.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
};
