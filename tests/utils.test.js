import { expect } from 'chai';
import { intersection, flattenDeep, uniq } from 'lodash';

import { BOARD_SIZE, BLUE_TEAM, RED_TEAM, BOMB } from '../src/constants';
import { buildBoard, buildGoals } from '../src/utils';

describe('Utils', () => {
  describe('buildBoard', () => {
    it('should build right size board', () => {
      const board = buildBoard();
      expect(board.length).to.eql(BOARD_SIZE);
      expect(board[0].length).to.eql(BOARD_SIZE);
    });
    it('should have no duplicates', () => {
      const board = buildBoard();
      const flatBoard = flattenDeep(board);
      expect(uniq(flatBoard).length).to.eql(flatBoard.length);
    });
  });
  describe('buildGoals', () => {
    it('should give first player + 1 goals', () => {
      const goals = buildGoals();
      const firstPlayer = goals.firstPlayer;
      expect(goals[firstPlayer].length).to.eql(6);
    });

    it('should give other player 5 goals', () => {
      const goals = buildGoals();
      const firstPlayer = goals.firstPlayer;
      expect(goals[firstPlayer === RED_TEAM ? BLUE_TEAM : RED_TEAM ].length).to.eql(5);
    })

    it('should always give bomb one option', () => {
      const goals = buildGoals();
      const firstPlayer = goals.firstPlayer;
      expect(goals[BOMB].length).to.eql(1);
    });

    it('should have no overlap between groups', () => {
      const goals = buildGoals();
      expect(intersection(goals[BLUE_TEAM], goals[RED_TEAM], goals[BOMB])).is.length(0);
    });
  });
});