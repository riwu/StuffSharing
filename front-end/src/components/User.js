import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Stuffs.css';

const User = (props) => {
  const selectedUser = props.users.find(user =>
    user.username === props.match.params.username) || {};
  const stuffsOwned = props.stuffs.filter(stuff => stuff.owner === selectedUser.id);
  console.log(stuffsOwned);
  return (
    <div>
      <div>Username: {selectedUser.username}</div>
      <div>Email: {selectedUser.email}</div>
      <div>First Name: {selectedUser.first_name}</div>
      <div>Last Name: {selectedUser.last_name}</div>
      <h4>Stuffs owned</h4>
      {stuffsOwned.map(stuff => (
        <div>{stuff.desc}</div>
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  stuffs: state.stuffs,
  users: state.users,
});

export default connect(mapStateToProps)(User);
