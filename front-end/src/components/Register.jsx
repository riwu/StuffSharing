import React from 'react';
import { Form, FormControl, ControlLabel, FormGroup, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withStateHandlers } from 'recompose';
import { register } from '../actions';

const addState = withStateHandlers(
  {
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
  },
  {
    setValue: () => (field, value) => ({
      [field]: value,
    }),
  },
);

const LoginPage = props => (
  <div>
    <h2>No account? Register now!</h2>
    <Form inline>
      <FormGroup>
        <ControlLabel>Username</ControlLabel>
        {' '}
        <FormControl
          value={props.username}
          onChange={e => props.setValue('username', e.target.value)}
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
          onChange={e => props.setValue('password', e.target.value)}
        />
      </FormGroup>
    </Form>

    <Form inline>
      <FormGroup>
        <ControlLabel>Email</ControlLabel>
        {' '}
        <FormControl
          value={props.email}
          onChange={e => props.setValue('email', e.target.value)}
        />
      </FormGroup>
    </Form>

    <Form inline>
      <FormGroup>
        <ControlLabel>First Name</ControlLabel>
        {' '}
        <FormControl
          value={props.firstName}
          onChange={e => props.setValue('firstName', e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <ControlLabel>Last Name</ControlLabel>
        {' '}
        <FormControl
          value={props.lastName}
          onChange={e => props.setValue('lastName', e.target.value)}
        />
      </FormGroup>
    </Form>

    <Button
      bsStyle="primary"
      onClick={() => props.register(props)}
    >Register</Button>
    {props.registerFailed &&
      <Alert bsStyle="warning">Username/Email taken!</Alert>
    }
  </div>
);

const mapStateToProps = state => ({
  registerFailed: state.actionFailed.registerFailed === true,
});

export default connect(mapStateToProps, { register })(addState(LoginPage));
