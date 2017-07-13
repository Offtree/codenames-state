import { combineReducers, createStore, applyMiddleware } from 'redux';
import sendToReciverMiddleware from './sendToRecieverMiddleware';

import boardReducer from './board/reducer';
import gameReducer from './game/reducer';

const reducers = combineReducers({
  board: boardReducer,
  game: gameReducer
});

export default () => {
  return createStore(
    reducers,
    applyMiddleware(
      sendToReciverMiddleware      
    )
  );
};
