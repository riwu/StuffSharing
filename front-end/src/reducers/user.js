const user = (state = {}, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        username: action.username,
        password: action.password,
      };
    case 'LOG_OUT':
      return {};
    default:
      return state;
  }
};

export default user;
