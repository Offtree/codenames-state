import { RED_TEAM } from './gameState';

export default {
  firstPlayer: RED_TEAM,
  [RED_TEAM]: [[0,0], [1,1], [2,2]],
  [BLUE_TEAM]: [[0,1], [1,0], [4,4]],
  [BOMB]: [2,3]
};
