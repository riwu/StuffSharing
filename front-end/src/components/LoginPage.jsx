import React from 'react';
import { Form, FormControl, ControlLabel, FormGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withStateHandlers } from 'recompose';
import { login } from '../actions';

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
  </div>
);

export default connect(null, { login })(addState(LoginPage));
