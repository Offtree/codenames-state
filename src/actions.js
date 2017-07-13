import { buildGoals, buildBoard } from './utils';

export const NEW_GAME = 'GAME - New game';
export const SELECT_TILE = 'GAME - select tile';
export const STAGE_SELECTION = 'GAME - stage selectoion';
export const UNDO_SELECT = 'GAME - undo turn';

export const newGame = () => {
  return {
    type: NEW_GAME,
    payload: {
      goals: buildGoals(),
      board: buildBoard()
    },
    sendToReciever: true
  }
};

export const pushStaged = () => ({
  type: SELECT_TILE,
  sendToReciever: true
});

export const stageSelection = (location) => ({
  type: STAGE_SELECTION,
  payload: location,
  sendToReciever: true
})
