import { find, isUndefined, isEqual, get } from 'lodash';
import { RED_TEAM, BLUE_TEAM, BOMB, FREE } from '../constants';

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

export const isMarked = (state, position) => {
  return !isUndefined(isInPositionList(state.game.turns.pastTurns, position));
};

export const getStaged = (state) => {
  return state.game.turns.stagedSelection;
};

export const isStaged = (state, position) => {
  return isEqual(getStaged(state), position);
};

export const getFirstPlayer = (state) => get(state, state.game.goals.firstPlayer);
