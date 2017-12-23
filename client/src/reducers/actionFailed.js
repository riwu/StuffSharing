const actionFailed = (state = {}, action) => {
  switch (action.type) {
    case 'LOG_IN_FAILED':
      return {
        loginFailed: true,
      };
    case 'LOG_IN':
      return {};
    case 'REGISTER_FAILED':
      return {
        registerFailed: true,
      };
    default:
      return state;
  }
};

export default actionFailed;
