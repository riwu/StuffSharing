import React from 'react';
import { connect } from 'react-redux';
import { lifecycle, withStateHandlers } from 'recompose';
import api from '../actions/api';
import './User.css';
import Stuffs from './Stuffs';
import StuffsListed from './StuffsListed';
import StuffsBorrowed from './StuffsBorrowed';

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

const updateUser = (props) => {
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
};

const addLifeCycle = lifecycle({
  componentWillMount() {
    updateUser(this.props);
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.match !== this.props.match) {
      updateUser(nextProps);
      return;
    }

    if (isAtOwnProfile(nextProps) && nextProps.loggedUser !== this.props.loggedUser) {
      console.log('updated props', nextProps.loggedUser);
      this.props.setUser(nextProps.loggedUser);
    }
  },
});

const User = ({ user, loggedUser }) => (
  <div className="User">
    <div className="info">
      {[['Username', user.info.username], ['Email', user.info.email],
        ['First Name', user.info.first_name],
        ['Last Name', user.info.last_name]].map(([label, value]) => (
          <h4 key={label} className="userProperty"><span className="userLabel">{label}: </span>{value}</h4>
        ))
      }
    </div>
    {user.stuffs.data.length > 0 &&
      <div>
        <h1 className="title">Listed items</h1>
        <StuffsListed stuffs={user.stuffs} />
      </div>
    }
    {loggedUser === user && user.stuffBorrowed.length > 0 &&
      <div>
        <h1 className="title">Borrowed items</h1>
        <Stuffs stuffs={{ data: user.stuffBorrowed }} />
      </div>
    }
  </div>
);

const mapStateToProps = state => ({
  loggedUser: state.user,
});

export default connect(mapStateToProps)(addState(addLifeCycle(User)));
