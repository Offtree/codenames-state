import { combineReducers, createStore, applyMiddleware } from 'redux';
import sendToReciverMiddleware from './sendToRecieverMiddleware';

import boardReducer from './board/reducer';
import gameReducer from './game/reducer';
import uiStateReducer from './uiState/reducer';


const reducers = combineReducers({
  board: boardReducer,
  game: gameReducer,
  uiState: uiStateReducer
});

export const makeGameStore = (isReciever = false) => {
  const middleWare = isReciever ? [sendToReciverMiddleware] : [];

  return createStore(
    reducers,
    applyMiddleware(
      ...middleWare      
    )
  );
};
