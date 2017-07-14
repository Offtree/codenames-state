export const booleanReducer = (actionType, defaultState = false) => {
  return (state = defaultState, action) => {
    if(action.type === actionType) return action.payload;
    return state;
  }
};
