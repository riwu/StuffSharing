import React from 'react';
import { withStateHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Modal, Button, Form, FormControl, ControlLabel } from 'react-bootstrap';
import './PostNew.css';
import { bid } from '../actions';

const addState = withStateHandlers(
  {
    bidAmount: '0',
  },
  {
    setBid: () => bidAmount => ({
      bidAmount,
    }),
  },
);

const Bid = props => (
  <Modal show={props.show} onHide={props.onHide} className="PostNew">
    <Modal.Header closeButton>
      <Modal.Title>Bid for {props.stuff.name}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form inline className="formGroup">
        <ControlLabel>Bid amount: $</ControlLabel>
        {' '}
        <FormControl
          type="number"
          min={0}
          max={9999}
          step={10}
          value={props.bidAmount}
          onChange={e => props.setBid(e.target.value)}
        />
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button
        disabled={props.bidAmount.trim() === ''}
        bsStyle="primary"
        onClick={() => {
          props.bid(props.stuff.id, props.bidAmount);
          props.onHide();
        }}
      >
          Bid
        </Button>
      <Button onClick={props.onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
);

export default connect(null, { bid })(addState(Bid));
