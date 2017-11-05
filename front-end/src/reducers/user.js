const initialState = {
  info: {},
  stuffs: [],
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOG_IN':
      return {
        ...state,
        info: action.user,
      };
    case 'RECEIVE_LOG_IN_USER_STUFFS':
      return {
        ...state,
        stuffs: action.stuffs,
      };
    case 'LOG_OUT':
      return initialState;
    default:
      return state;
  }
};

export default user;
