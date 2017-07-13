import { combineReducers } from 'redux';
import { RED_TEAM, BLUE_TEAM, BOMB, FREE, BOARD_SIZE } from '../../constants/gameState';
import { UNDO_SELECT, NEW_GAME, SELECT_TILE, STAGE_SELECTION } from '../../actions';

const goals = (state = {}, action) => {
  switch (action.type) {
    case NEW_GAME:
      return action.payload.goals;
    default:
      return state;
  }
}

const turnState = {
  pastTurns: [],
  stagedSelection: null
};

const turns = (state = turnState, action) => {
  switch (action.type) {
    case SELECT_TILE:
      return {
        stagedSelection: null,
        pastTurns: [...state.pastTurns, state.stagedSelection]
      }
    case NEW_GAME:
      return { ...turnState };
    case STAGE_SELECTION:
      return {
        ...state,
        stagedSelection: action.payload
      };
    default:
      return state;
  }
};

export default combineReducers({
  goals,
  turns,
});
