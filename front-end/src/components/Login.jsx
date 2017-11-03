import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

const Login = props => (
  <Button bsStyle="primary" onClick={props.onLogin}>
    {props.user.username ? 'Log out' : 'Login/Register'}
  </Button>
);

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  onLogin: () => push('login'),
})(Login);
