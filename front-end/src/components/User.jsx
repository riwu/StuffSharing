import React from 'react';
import { connect } from 'react-redux';
import { lifecycle, withStateHandlers } from 'recompose';
import api from '../actions/api';
import './User.css';
import Stuffs from './Stuffs';

const addState = withStateHandlers(
  {
    user: {
      info: {},
      stuffs: { data: [], pageCount: 0 },
    },
  },
  {
    setUser: () => user => ({
      user,
    }),
  },
);

const addLifeCycle = lifecycle({
  componentWillMount() {
    const props = this.props;
    const username = props.match.params.username;
    if (props.loggedUser.info.username === username) {
      console.log('logged', props.loggedUser);
      props.setUser(props.loggedUser);
    } else {
      console.log('getting user', username);
      api.getUser(username).then((user) => {
        console.log('gotten user', user);
        props.setUser(user);
      });
    }
  },
});

const User = ({ user }) => (
  <div className="User">
    <div className="info">
      <div>Username: {user.info.username}</div>
      <div>Email: {user.info.email}</div>
      <div>First Name: {user.info.first_name}</div>
      <div>Last Name: {user.info.last_name}</div>
    </div>
    {user.stuffs.data.length > 0 &&
      <Stuffs
        stuffs={user.stuffs}
        search={{ page: 1 }}
      />
      }
  </div>
  );

const mapStateToProps = state => ({
  loggedUser: state.user,
});

export default connect(mapStateToProps)(addState(addLifeCycle(User)));
