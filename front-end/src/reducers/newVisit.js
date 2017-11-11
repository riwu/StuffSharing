const newVisit = (state = true, action) => {
  switch (action.type) {
    case 'SET_NOT_NEW_VISIT':
      return false;
    default:
      return state;
  }
};

export default newVisit;
