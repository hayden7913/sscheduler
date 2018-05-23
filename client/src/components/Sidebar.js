import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default function Sidebar({
  deleteAll,
  deleteCompleted,
  onSidebar,
  handleExportClick,
  isActive,
  importCards,
  onRequestChange,
  uncompleteAll,
}) {
  return (
    <div>
      <Drawer
          docked={false}
          open={isActive}
          onRequestChange={(open) => onRequestChange(open)}
          overlayStyle={{ backgroundColor: "transparent"}}
        >
        <input
          onChange={importCards}
          type="file"
          name="files"
        />
        <button
          onClick={handleExportClick}
        >
          Export
        </button>
        <MenuItem
          onClick={deleteAll}
        >
          Delete All
        </MenuItem>
        <MenuItem
          onClick={deleteCompleted}
        >
          Delete Completed
        </MenuItem>
        <MenuItem
          onClick={uncompleteAll}
        >
          Uncomplete All
        </MenuItem>
      </Drawer>
    </div>
  );
}
