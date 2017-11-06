import React from 'react';
import { connect } from 'react-redux';
import { lifecycle, withStateHandlers } from 'recompose';
import api from '../actions/api';
import './User.css';
import Stuffs from './Stuffs';

const addState = withStateHandlers(
  {
    user: {},
    stuffs: { data: [], pageCount: 0 },
    bids: [],
    page: 0,
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
    if (props.loggedUser.info.username === username) {
      console.log('logged', props.loggedUser);
      props.setUser(props.loggedUser.info);
      props.setStuffs(props.loggedUser.stuffs);
    } else {
      console.log('getting user', username);
      api.getUser(username).then((user) => {
        console.log('gotten user', user);
        props.setUser({ ...user.userData[0], username });
        props.setStuffs({ data: user.userStuff, pages: 1 });
      });
    }
  },
});

const User = ({ user, stuffs, ...props }) => {
  console.log(user);
  return (
    <div className="User">
      <div className="info">
        <div>Username: {user.username}</div>
        <div>Email: {user.email}</div>
        <div>First Name: {user.first_name}</div>
        <div>Last Name: {user.last_name}</div>
      </div>
      {stuffs.data.length > 0 &&
        <Stuffs
          stuffs={stuffs}
          search={{ page: props.page }}
          setFilter={() => {}}
          getStuffs={() => {}}
        />
      }
    </div>
  );
};

const mapStateToProps = state => ({
  loggedUser: state.user,
});

export default connect(mapStateToProps)(addState(addLifeCycle(User)));
