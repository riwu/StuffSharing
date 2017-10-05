import api from './api';

export const getUsers = (dispatch) => {
  api.getUsers().then((users) => {
    dispatch({
      type: 'RECEIVE_USERS',
      users,
    });
  });
};

export const getStuffs = (dispatch) => {
  api.getStuffs().then((stuffs) => {
    dispatch({
      type: 'RECEIVE_STUFFS',
      stuffs,
    });
  });
};


export const getLoans = (dispatch) => {
  api.getLoans().then((loans) => {
    dispatch({
      type: 'RECEIVE_LOANS',
      loans,
    });
  });
};

export const getBids = (dispatch) => {
  api.getBids().then((bids) => {
    dispatch({
      type: 'RECEIVE_BIDS',
      bids,
    });
  });
};
