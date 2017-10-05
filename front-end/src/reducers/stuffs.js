const stuffs = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_STUFFS':
      return action.stuffs;
    default:
      return state;
  }
};

export default stuffs;
