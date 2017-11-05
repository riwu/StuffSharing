const stuffs = (state = { data: [], pageCount: 0 }, action) => {
  switch (action.type) {
    case 'RECEIVE_STUFFS':
      return action.stuffs;
    case 'DELETED_STUFF':
      return {
        ...state,
        data: state.data.filter(stuff => stuff.id !== action.id),
      };
    default:
      return state;
  }
};

export default stuffs;
