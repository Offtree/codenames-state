import { NEW_GAME } from '../../actions';

export default (state = [], action) => {
  switch (action.type) {
    case NEW_GAME:
      return action.payload.board;
    default:
      return state;
  }
};
