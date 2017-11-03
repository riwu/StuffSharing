import { push } from 'react-router-redux';
import api from './api';

export const getUsers = (dispatch) => {
  api.getUsers().then((users) => {
    dispatch({
      type: 'RECEIVE_USERS',
      users,
    });
  });
};

export const getStuffs = search => (dispatch) => {
  api.getStuffs(search).then((stuffs) => {
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

export const setFilter = (name, value) => ({
  type: 'SET_FILTER',
  name,
  value,
});

export const login = (username, password) => (dispatch) => {
  api.login(username, password).then(() => {
    dispatch({
      type: 'LOG_IN',
      username,
      password,
    });
    dispatch(push('/'));
  }).catch(() => {
    dispatch({
      type: 'LOG_IN_FAILED',
    });
  });
};

export const logout = () => ({
  type: 'LOG_OUT',
});

export const register = user => (dispatch) => {
  api.register(user).then(() => {
    dispatch({
      type: 'LOG_IN',
      username: user.username,
      password: user.password,
    });
    dispatch(push('/'));
  }).catch(() => {
    dispatch({
      type: 'REGISTER_FAILED',
    });
  });
};
