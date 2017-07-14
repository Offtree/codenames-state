import { combineReducers } from 'redux';
import { booleanReducer } from '../reducerToolkit';

import { MODAL_HELP_DIALOG_DISPLAY } from '../../actions';

export default combineReducers({
  helpDialogOpen: booleanReducer(MODAL_HELP_DIALOG_DISPLAY)
});
