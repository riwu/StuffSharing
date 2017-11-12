import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import { stuffReturned } from '../actions';
import Stuffs from './Stuffs';

const LoanDate = ({ stuff }) => (
  <td>{moment(stuff.loan_date).format('D MMM YY')}</td>
);

const Borrower = ({ stuff }) => (
  <td>{stuff.borrower}</td>
);

const StuffChildren = ({ stuff, ...props }) => (
  <td>
    <Button
      onClick={() => props.stuffReturned(stuff.id)}
      bsStyle="primary"
    >
      Confirm Return
    </Button>
  </td>
);

const StuffChildrenConnected = connect(null, {
  stuffReturned,
})(StuffChildren);

const StuffsListed = props => (
  <Stuffs
    stuffs={props.stuffs}
    extraHeaders={['Loan date', 'Borrower']}
    extra={[LoanDate, Borrower, StuffChildrenConnected]}
  />
  );

export default StuffsListed;
