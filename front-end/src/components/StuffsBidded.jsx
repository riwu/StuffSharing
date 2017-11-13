import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { cancelBid } from '../actions';
import Stuffs from './Stuffs';

const BidDate = ({ stuff }) => (
  <td>
    {moment(stuff.TIMESTAMP).format('D MMM YY')}
  </td>
);

const Status = ({ stuff }) => (
  <td>
    {stuff.status.charAt(0).toUpperCase() + stuff.status.slice(1)}
  </td>
);

const BidAmount = ({ stuff }) => (
  <td>
    ${stuff.bid_amt}
  </td>
);

const CancelBid = ({ stuff, ...props }) => (
  <td>
    <Button
      onClick={() => props.cancelBid(stuff.id)}
      bsStyle="primary"
    >
      Cancel Bid
    </Button>
  </td>
);

const CancelBidConnected = connect(null, { cancelBid })(CancelBid);

const StuffsBidded = props => (
  <Stuffs
    stuffs={props.stuffs}
    extra={[BidDate, Status, BidAmount, CancelBidConnected]}
    extraHeaders={['Bid date', 'Status', 'Bid amount']}
    showOwner
  />
);

export default StuffsBidded;
