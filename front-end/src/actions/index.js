import { push } from 'react-router-redux';
import api from './api';

const dispatchLogin = (dispatch, user) => {
  console.log('successfully logged in', user);
  dispatch({
    type: 'USER_UPDATED',
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

export const updateUserInfo = user => (dispatch) => {
  api.updateUser(user).then(() => {
    dispatch({
      type: 'USER_UPDATED',
      user,
    });
  }).catch(e => alert(`User update failed ${e.message}`));
};

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

export const bid = (stuffId, bidAmt) => (dispatch) => {
  api.bid(stuffId, bidAmt).then((data) => {
    dispatch({
      type: 'RECEIVE_USER_DATA',
      data,
    });
  }).catch(e => alert(`Failed to bid for ${stuffId} ${e.message}`));
};

export const cancelBid = stuffId => (dispatch) => {
  api.cancelBid(stuffId).then((data) => {
    dispatch({
      type: 'RECEIVE_USER_DATA',
      data,
    });
  }).catch(e => alert(`Failed to cancel bid for ${stuffId} ${e.message}`));
};

export const denyBid = (stuffId, bidder) => (dispatch) => {
  api.denyBid(stuffId, bidder).then((data) => {
    dispatch({
      type: 'RECEIVE_USER_DATA',
      data,
    });
  }).catch(e => alert(`Failed to deny bid for ${stuffId} ${e.message}`));
};

export const acceptBid = (stuffId, bidder) => (dispatch) => {
  api.acceptBid(stuffId, bidder).then((data) => {
    dispatch({
      type: 'RECEIVE_USER_DATA',
      data,
    });
  }).catch(e => alert(`Failed to accept bid for ${stuffId} ${e.message}`));
};
