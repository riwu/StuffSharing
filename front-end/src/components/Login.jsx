import React from 'react';
import { FormControl, ControlLabel, FormGroup, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withStateHandlers } from 'recompose';
import { login } from '../actions';
import './Login.css';

const addState = withStateHandlers(
  {
    username: '',
    password: '',
  },
  {
    setUsername: () => value => ({
      username: value,
    }),
    setPassword: () => value => ({
      password: value,
    }),
  },
);

const Login = props => (
  <div className="Login">
    <h2 className="formGroup">Log in to your account</h2>
    <FormGroup className="formGroup">
      <ControlLabel className="formLabel">Username</ControlLabel>
      <FormControl
        autoComplete="username"
        value={props.username}
        onChange={e => props.setUsername(e.target.value)}
      />
    </FormGroup>

    <FormGroup className="formGroup">
      <ControlLabel className="formLabel">Password</ControlLabel>
      <FormControl
        type="password"
        value={props.password}
        onChange={e => props.setPassword(e.target.value)}
      />
    </FormGroup>

    <div className="button">
      <Button
        style={{ width: '150px' }}
        bsStyle="primary"
        onClick={() => props.login(props.username, props.password)}
      >
        Login
      </Button>
    </div>
    {props.loginFailed &&
      <Alert bsStyle="warning">Incorrect username or password!</Alert>
    }
  </div>
);

const mapStateToProps = state => ({
  loginFailed: state.actionFailed.loginFailed === true,
});

export default connect(mapStateToProps, { login })(addState(Login));
