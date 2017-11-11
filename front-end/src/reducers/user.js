const initialState = {
  info: {},
  stuffs: { data: [], pageCount: 0 },
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        info: action.user,
      };
    case 'RECEIVE_USER_DATA':
      return {
        ...action.data,
        info: state.info,
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
