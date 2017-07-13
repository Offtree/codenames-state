import { combineReducers } from 'redux';
import { find, sample, isUndefined, shuffle, range } from 'lodash';
import { RED_TEAM, BLUE_TEAM, BOMB, FREE, BOARD_SIZE } from '../../constants/gameState';
import { UNDO_SELECT, NEW_GAME, SELECT_TILE, STAGE_SELECTION } from './actions';

const getAvailableSpots = () => {
  const grid = [];
  range(0, BOARD_SIZE).forEach(( row ) => {
    range(0, BOARD_SIZE).forEach( ( col ) => {
      grid.push([row, col])
    });
  });
  return grid;
}
const buildGoals = () => {
  const firstPlayer = sample([RED_TEAM, BLUE_TEAM], 1)[0];
  const grid = shuffle(getAvailableSpots());
  return {
    firstPlayer,
    [RED_TEAM]: grid.splice(0, firstPlayer === RED_TEAM ? 5 : 6),
    [BLUE_TEAM]: grid.splice(0, firstPlayer === RED_TEAM ? 5 : 6),
    [BOMB]: grid.splice(0, 1)
  }
};
const isInPositionList = (all, search) => {
  return find(all, (i) => i[0] === search[0] && i[1] === search[1]);
};
export const getOwnedBy = (state, position) => {
  const goals = state.game.goals;
  if (isInPositionList(goals[RED_TEAM], position)) return RED_TEAM;
  if (isInPositionList(goals[BLUE_TEAM], position)) return BLUE_TEAM;
  if (isInPositionList(goals[BOMB], position)) return BOMB;
  return FREE
};
export const getMarked = (state, position) => {
  return !isUndefined(isInPositionList(state.game.turns.pastTurns, position));
}
export const isStaged = (state, position) => {
  return state.game.turns.stagedSelection === position;
}
export const getStaged = (state) => {
  return state.game.turns.stagedSelection;
}

const goals = (state = {}, action) => {
  switch (action.type) {
    case NEW_GAME:
      return buildGoals();
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
    case UNDO_SELECT:
      return {
        ...state,
        pastTurns: state.pastTurns.slice(0, state.length - 1)
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
