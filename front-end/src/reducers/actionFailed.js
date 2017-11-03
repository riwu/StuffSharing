const actionFailed = (state = {}, action) => {
  switch (action.type) {
    case 'LOG_IN_FAILED':
      return {
        loginFailed: true,
      };
    case 'REGISTER_FAILED':
      return {
        registerFailed: true,
      };
    default:
      return state;
  }
};

export default actionFailed;
