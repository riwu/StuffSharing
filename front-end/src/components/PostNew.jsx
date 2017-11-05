import React from 'react';
import { withStateHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Modal, Button, Form, FormControl, DropdownButton, ControlLabel, MenuItem, Alert } from 'react-bootstrap';
import Slider from 'rc-slider';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';
import './PostNew.css';
import CountrySelect from './react-country-select';
import api from '../actions/api';

const addState = withStateHandlers(
  {
    name: '',
    description: '',
    condition: 3,
    price: '0',
    location: { value: 'SG', label: 'Singapore' },
    availableFrom: moment().format('D MMM YY'),
    loanDays: 90,
    category: 'Others',
    postFailedMessage: null,
  },
  {
    setFilter: () => (field, value) => ({
      [field]: value,
    }),
    setPostFailed: () => errorMessage => ({
      postFailedMessage: `Post new failed: ${errorMessage || 'please check your connection'}`,
    }),
  },
);

const PostNew = ({ setFilter, ...props }) => (
  <Modal show={props.show} onHide={props.onHide} className="PostNew">
    <Modal.Header closeButton>
      <Modal.Title>Post new item for loan</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {props.postFailedMessage && <Alert bsStyle="warning">{props.postFailedMessage}</Alert>}

      <Form inline className="formGroup">
        <ControlLabel>Name:</ControlLabel>
        {' '}
        <FormControl
          placeholder="Enter a name"
          value={props.name}
          onChange={e => setFilter('name', e.target.value)}
        />
      </Form>
      <Form inline className="formGroup">
        <ControlLabel>Description:</ControlLabel>
        {' '}
        <FormControl
          placeholder="Enter a description"
          value={props.description}
          onChange={e => setFilter('description', e.target.value)}
        />
      </Form>

      <Form className="formGroup">
        <ControlLabel>Category:</ControlLabel>
        {' '}
        <DropdownButton
          id="post-new-category"
          title={props.category}
        >
          {['Books', 'Movies/Music', 'Games/Toys', 'Electronics', 'Home',
            'Clothes/Shoes/Jewellery', 'Sports', 'Automotives',
            'Office & School Supplies', 'Others'].map(category => (
              <MenuItem
                key={category}
                onClick={() => setFilter('category', category)}
                active={props.category === category}
              >{category}</MenuItem>
        ))}
        </DropdownButton>
      </Form>

      <Form className="inlineForm">
        <ControlLabel>Condition</ControlLabel>
        <Slider
          className="slider"
          value={props.condition}
          min={1}
          max={5}
          marks={{
            1: 'Very old',
            5: 'New',
            ...[...Array(3).keys()].reduce((obj, value) => {
              const key = value + 2;
              obj[key] = key; //eslint-disable-line
              return obj;
            }, {}),
          }}
          step={1}
          onChange={value => setFilter('condition', value)}
        />
      </Form>

      <Form inline className="formGroup">
        <ControlLabel>Price: $</ControlLabel>
        {' '}
        <FormControl
          type="number"
          min={0}
          max={99999}
          step={10}
          value={props.price}
          onChange={e => setFilter('price', e.target.value)}
        />
      </Form>

      <Form className="formGroup">
        <ControlLabel>Available from:</ControlLabel>
        {' '}
        <DayPickerInput
          value={props.availableFrom}
          format="D MMM YY"
          onDayChange={day => setFilter('availableFrom', day.format('D MMM YY'))}
        />
      </Form>

      <Form inline className="formGroup">
        <ControlLabel>Max loan days:</ControlLabel>
        {' '}
        <FormControl
          type="number"
          min={0}
          max={9999}
          step={10}
          value={props.loanDays}
          onChange={e => setFilter('loanDays', e.target.value)}
        />
      </Form>

      <div className="inlineForm">
        <ControlLabel className="countryLabel">Country:</ControlLabel>
        <div className="countrySelect">
          <CountrySelect
            flagImagePath="./assets/flags/"
            value={props.location}
            onSelect={countries => setFilter('location', countries)}
          />
        </div>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button
        disabled={props.name.trim() === '' || props.description.trim() === '' || !props.location}
        bsStyle="primary"
        onClick={() => {
          api.postNew({
            name: props.name,
            desc: props.description,
            condition: props.condition,
            category: props.category,
            location: props.location.label,
            price: props.price,
            available_from: moment(props.availableFrom, 'D MMM YY').format('YYYY-MM-DD'),
            max_loan_period: props.loanDays,
            user: props.user,
          }).then(() => props.onHide())
          .catch(e => props.setPostFailed(e.message));
        }}
      >
        Post
      </Button>
      <Button onClick={props.onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
);

const mapStateToProps = state => ({
  user: state.user.info,
});

export default connect(mapStateToProps, {})(addState(PostNew));
