import { GENERATE_BOARD } from './actions';
import { NEW_GAME } from '../game/actions';
import { sampleSize, chunk } from 'lodash';
import WORDS from '../../constants/words';
import { BOARD_SIZE } from '../../constants/gameState';

export const buildBoard = () => {
  const gameWords = sampleSize(WORDS, BOARD_SIZE*BOARD_SIZE);
  return chunk(gameWords, BOARD_SIZE);
}

export default (state = [], action) => {
  switch (action.type) {
    case GENERATE_BOARD:
    case NEW_GAME:
      return buildBoard();
    default:
      return state;
  }
};
