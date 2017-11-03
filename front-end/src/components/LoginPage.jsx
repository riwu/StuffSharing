import React from 'react';
import { Form, FormControl, ControlLabel, FormGroup, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withStateHandlers } from 'recompose';
import { login } from '../actions';
import Register from './Register';

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
  <div>
    <h2>Log in to your account</h2>
    <Form inline>
      <FormGroup>
        <ControlLabel>Username</ControlLabel>
        {' '}
        <FormControl
          value={props.username}
          onChange={e => props.setUsername(e.target.value)}
        />
      </FormGroup>
    </Form>

    <Form inline>
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

    <Button bsStyle="primary" onClick={() => props.login()}>Login</Button>
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
