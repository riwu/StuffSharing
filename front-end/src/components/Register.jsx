import React from 'react';
import { Form, FormControl, ControlLabel, FormGroup, Button, Alert, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withStateHandlers } from 'recompose';
import { register } from '../actions';
import './Register.css';

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

const LoginPage = (props) => {
  const disabled = props.username.trim() === '' || props.password.trim() === '' || props.email.trim() === '';
  const Register = (
    <Button
      style={{ width: '200px' }}
      bsStyle="primary"
      onClick={() => {
        if (disabled) return;
        props.register({
          username: props.username,
          password: props.password,
          email: props.email,
          firstName: props.firstName,
          lastName: props.lastName,
        });
      }}
    >
      Register
    </Button>
  );
  return (
    <div className="Register">
      <h2 className="formGroup">No account? Register now!</h2>
      <Form inline className="formGroup">
        <FormGroup>
          <ControlLabel className="usernameAndPass">Username</ControlLabel>
          {' '}
          <FormControl
            value={props.username}
            onChange={e => props.setValue('username', e.target.value)}
          />
        </FormGroup>
      </Form>

      <Form inline className="formGroup">
        <FormGroup>
          <ControlLabel className="usernameAndPass">Password</ControlLabel>
          {' '}
          <FormControl
            type="password"
            value={props.password}
            onChange={e => props.setValue('password', e.target.value)}
          />
        </FormGroup>
      </Form>

      <Form inline className="formGroup">
        <FormGroup>
          <ControlLabel className="emailLabel">Email</ControlLabel>
          <FormControl
            value={props.email}
            onChange={e => props.setValue('email', e.target.value)}
          />
        </FormGroup>
      </Form>

      <Form inline className="formGroup">
        <FormGroup>
          <ControlLabel>First Name</ControlLabel>
          {' '}
          <FormControl
            value={props.firstName}
            onChange={e => props.setValue('firstName', e.target.value)}
          />
        </FormGroup>
      </Form>

      <Form inline className="formGroup">
        <FormGroup>
          <ControlLabel>Last Name</ControlLabel>
          {' '}
          <FormControl
            value={props.lastName}
            onChange={e => props.setValue('lastName', e.target.value)}
          />
        </FormGroup>
      </Form>
      {disabled
       ?
         <OverlayTrigger
           placement="bottom"
           overlay={<Tooltip id="empty-register-fields">Username / Password / Email cannot be empty!</Tooltip>}
         >
           {Register}
         </OverlayTrigger>
       :
         <div>{Register}</div>
      }

      {props.registerFailed &&
        <Alert bsStyle="warning">Username/Email taken!</Alert>
      }
    </div>
  );
};

const mapStateToProps = state => ({
  registerFailed: state.actionFailed.registerFailed === true,
});

export default connect(mapStateToProps, { register })(addState(LoginPage));
