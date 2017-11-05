import React from 'react';
import { connect } from 'react-redux';
import { lifecycle, withStateHandlers, compose, mapProps } from 'recompose';
import api from '../actions/api';
import './User.css';

const addState = withStateHandlers(
  {
    user: {},
    stuffs: { data: [], pageCount: 0 },
  },
  {
    setUser: () => user => ({
      user,
    }),
    setStuffs: () => stuffs => ({
      stuffs,
    }),
  },
);

const addLifeCycle = lifecycle({
  componentWillMount() {
    const props = this.props;
    const username = props.match.params.username;
    if (props.loggedUser.login.username === username) {
      console.log('logged', props.loggedUser);
      props.setUser(props.loggedUser.info);
      props.setStuffs(props.loggedUser.stuffs);
    } else {
      console.log('getting user', username);
      api.getUser(username).then(user => props.setUser(user));
      api.getStuffs({ owner: username }).then(stuffs => props.setStuffs(stuffs));
    }
  },
});

const combine = compose(
  addState,
  addLifeCycle,
  mapProps((props) => {
    console.log(props);
    // return { user, stuffs })
  }),
);

const User = ({ user }) => (
  <div>
    <div>Username: {user.username}</div>
    <div>Email: {user.email}</div>
    <div>First Name: {user.first_name}</div>
    <div>Last Name: {user.last_name}</div>
    <h4>Stuffs owned</h4>
  </div>
);

const mapStateToProps = state => ({
  loggedUser: state.user,
});

export default connect(mapStateToProps)(combine(User));
