import { sample, shuffle, range, chunk, sampleSize } from 'lodash';
import {
  RED_TEAM,
  BLUE_TEAM,
  BOMB, 
  BOARD_SIZE,
  WORDS
} from './constants';

const getAvailableSpots = () => {
  const grid = [];
  range(0, BOARD_SIZE).forEach(( row ) => {
    range(0, BOARD_SIZE).forEach( ( col ) => {
      grid.push([row, col])
    });
  });
  return grid;
}

export const buildBoard = () => {
  const gameWords = sampleSize(WORDS, BOARD_SIZE*BOARD_SIZE);
  return chunk(gameWords, BOARD_SIZE);
}

export const buildGoals = () => {
  const firstPlayer = sample([RED_TEAM, BLUE_TEAM], 1)[0];
  const grid = shuffle(getAvailableSpots());
  return {
    firstPlayer,
    [RED_TEAM]: grid.splice(0, firstPlayer === RED_TEAM ? 5 : 6),
    [BLUE_TEAM]: grid.splice(0, firstPlayer === RED_TEAM ? 5 : 6),
    [BOMB]: grid.splice(0, 1)
  }
};