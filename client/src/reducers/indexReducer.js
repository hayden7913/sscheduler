import { combineReducers } from 'redux';

import { listOne } from './listOne';
import { ui } from './ui';

export default combineReducers({
  listOne,
  ui,
});
