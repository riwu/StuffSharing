const initialState = {
  info: {},
  stuffs: { data: [], pageCount: 0 },
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
    case 'DELETED_STUFF':
      return {
        ...state,
        stuffs: {
          ...state.stuffs,
          data: state.stuffs.data.filter(stuff => stuff.id !== action.id),
        },
      };
    case 'ADDED_STUFF':
      return {
        ...state,
        stuffs: {
          ...state.stuffs,
          data: [
            ...state.stuffs.data,
            action.stuff,
          ],
        },
      };
    case 'LOG_OUT':
      return initialState;
    default:
      return state;
  }
};

export default user;
