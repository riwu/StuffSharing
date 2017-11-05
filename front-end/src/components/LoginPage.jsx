import React from 'react';
import { Form, FormControl, ControlLabel, FormGroup, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withStateHandlers } from 'recompose';
import { login } from '../actions';
import Register from './Register';
import './LoginPage.css';

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

const LoginPage = props => (
  <div className="LoginPage">
    <h2 className="formGroup">Log in to your account</h2>
    <Form inline className="formGroup">
      <FormGroup>
        <ControlLabel>Username</ControlLabel>
        {' '}
        <FormControl
          autoComplete="username"
          value={props.username}
          onChange={e => props.setUsername(e.target.value)}
        />
      </FormGroup>
    </Form>

    <Form inline className="formGroup">
      <FormGroup>
        <ControlLabel>Password</ControlLabel>
        {' '}
        <FormControl
          type="password"
          value={props.password}
          onChange={e => props.setPassword(e.target.value)}
        />
      </FormGroup>
    </Form>

    <Button
      style={{ width: '200px' }}
      bsStyle="primary"
      onClick={() => props.login(props.username, props.password)}
    >
      Login
    </Button>
    {props.loginFailed &&
      <Alert bsStyle="warning">Incorrect username or password!</Alert>
    }
    <Register />
  </div>
);

const mapStateToProps = state => ({
  loginFailed: state.actionFailed.loginFailed === true,
});

export default connect(mapStateToProps, { login })(addState(LoginPage));
