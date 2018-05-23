import { combineReducers } from 'redux';
import { undoableListOne } from './listOne';
import { ui } from './ui';

export default combineReducers({
  listOne: undoableListOne,
  ui,
});
