import { push } from 'react-router-redux';
import api from './api';

export const setNotNewVisit = () => ({
  type: 'SET_NOT_NEW_VISIT',
});

export const setFilter = (name, value) => ({
  type: 'SET_FILTER',
  name,
  value,
});

export const getStuffs = search => (dispatch) => {
  api.getStuffs(search).then((stuffs) => {
    console.log('stuffs', stuffs);
    dispatch(setFilter('page', 0));
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

export const deleteStuff = stuffId => (dispatch) => {
  console.log('deleting', stuffId);
  api.deleteStuff(stuffId)
    .then(() => {
      dispatch({
        type: 'DELETED_STUFF',
        id: stuffId,
      });
    }).catch(e => alert(`Failed to delete ${e.message}`));
};

export const addStuff = stuff => (dispatch) => {
  dispatch({
    type: 'ADDED_STUFF',
    stuff,
  });
};

export const stuffReturned = stuffId => (dispatch) => {
  console.log('returning', stuffId);
  api.stuffReturned(stuffId).then(() => {
    dispatch({
      type: 'STUFF_RETURNED',
      stuffId,
    });
  }).catch(e => alert(`Failed to return item ${stuffId} ${e.message}`));
};

const dispatchLogin = (dispatch, user) => {
  console.log('successfully logged in', user);
  dispatch({
    type: 'LOG_IN',
    user,
  });
  dispatch(push('/'));
  api.getUser(user.username).then((data) => {
    dispatch({
      type: 'RECEIVE_USER_DATA',
      data,
    });
  }).catch(() => console.log('failed to get data'));
};

export const login = (username, password) => (dispatch) => {
  api.login(username, password).then((user) => {
    dispatchLogin(dispatch, user);
  }).catch((e) => {
    console.log('failed', e.message);
    dispatch({
      type: 'LOG_IN_FAILED',
    });
  });
};

export const logout = () => ({
  type: 'LOG_OUT',
});

export const register = user => (dispatch) => {
  api.register(user).then((data) => {
    dispatchLogin(dispatch, { ...user, id: data.id });
  }).catch(() => {
    dispatch({
      type: 'REGISTER_FAILED',
    });
  });
};
