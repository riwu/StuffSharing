const stuffs = (state = { data: [], pageCount: 0 }, action) => {
  switch (action.type) {
    case 'RECEIVE_STUFFS':
      return action.stuffs;
    default:
      return state;
  }
};

export default stuffs;
