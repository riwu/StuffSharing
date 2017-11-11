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

const isAtOwnProfile = props => props.loggedUser.info.username === props.match.params.username;

const addLifeCycle = lifecycle({
  componentWillMount() {
    const props = this.props;
    if (isAtOwnProfile(props)) {
      console.log('logged', props.loggedUser);
      props.setUser(props.loggedUser);
    } else {
      console.log('getting user', props.match.params.username);
      api.getUser(props.match.params.username).then((user) => {
        console.log('gotten user', user);
        props.setUser(user);
      });
    }
  },
  componentWillReceiveProps(nextProps) {
    if (!isAtOwnProfile(nextProps) || nextProps.loggedUser === this.props.loggedUser) {
      return;
    }
    console.log('updated props', nextProps.loggedUser);
    this.props.setUser(nextProps.loggedUser);
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
