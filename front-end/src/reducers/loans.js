const loans = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_LOANS':
      return action.loans;
    default:
      return state;
  }
};

export default loans;
