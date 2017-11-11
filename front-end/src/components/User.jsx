import React from 'react';
import { connect } from 'react-redux';
import { Button, FormControl } from 'react-bootstrap';
import { lifecycle, withStateHandlers } from 'recompose';
import api from '../actions/api';
import './User.css';
import StuffsListed from './StuffsListed';
import StuffsBorrowed from './StuffsBorrowed';
import StuffsLent from './StuffsLent';
import { updateUserInfo } from '../actions';

const addState = withStateHandlers(
  {
    user: {
      info: {},
      stuffs: { data: [], pageCount: 0 },
    },
    editUser: {
      editting: false,
      info: {},
    },
  },
  {
    setUser: ({ editUser }) => user => ({
      user,
      editUser: { ...editUser, info: user.info },
    }),
    toggleEditUser: ({ editUser }) => () => ({
      editUser: {
        ...editUser,
        editting: !editUser.editting,
      },
    }),
    setEditInfo: ({ editUser }) => (field, value) => ({
      editUser: {
        ...editUser,
        info: {
          ...editUser.info,
          [field]: value,
        },
      },
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
    console.log('receiving props');
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

const User = ({ user, loggedUser, ...props }) => {
  console.log('user props', props);
  return (
    <div className="User">
      <h1>User Info {loggedUser === user &&
        <Button
          bsStyle="primary"
          onClick={() => {
            props.toggleEditUser();
            if (props.editUser.editting) {
              props.updateUserInfo(props.editUser.info);
            }
          }}
        >{props.editUser.editting ? 'Save' : 'Edit'}</Button>}
        {loggedUser === user && props.editUser.editting &&
          <Button
            style={{ marginLeft: '10px' }}
            onClick={() => {
              props.toggleEditUser();
              props.setUser(user);
            }}
          >Cancel</Button>}
      </h1>

      <div className="info">
        {[['Username', 'username'], ['Email', 'email'],
          ['First Name', 'first_name'],
          ['Last Name', 'last_name']].map(([label, field]) => (
            <h4 key={label} className="userProperty"><span className="userLabel">{label}:</span>
              {props.editUser.editting && label !== 'Username'
                ?
                  <FormControl
                    value={props.editUser.info[field]}
                    onChange={e => props.setEditInfo(field, e.target.value)}
                  />
                :
                  <span>{user.info[field]}</span>
              }
            </h4>
          ))
        }
      </div>
      {user.stuffs.data.length > 0 &&
        <div>
          <h1 className="title">Listed items</h1>
          <StuffsListed stuffs={user.stuffs} />
        </div>
      }
      {loggedUser === user &&
        <div>
          {user.stuffBorrowed.length > 0 &&
          <div>
            <h1 className="title">Borrowed items</h1>
            <StuffsBorrowed stuffs={{ data: user.stuffBorrowed }} />
          </div>
          }
          {user.stuffLent.length > 0 &&
          <div>
            <h1 className="title">Lent items</h1>
            <StuffsLent stuffs={{ data: user.stuffLent }} />
          </div>
          }
        </div>
      }
    </div>
  );
};

const mapStateToProps = state => ({
  loggedUser: state.user,
});

export default connect(mapStateToProps, { updateUserInfo })(addState(addLifeCycle(User)));
