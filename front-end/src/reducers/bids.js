const bids = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_BIDS':
      return action.bids;
    default:
      return state;
  }
};

export default bids;
