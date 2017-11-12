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
    {moment(stuff.status.charAt(0).toUpperCase() + stuff.status.slice(1)).format('D MMM YY')}
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
    extra={[BidDate, Status, CancelBidConnected]}
    extraHeaders={['Bid date', 'Status']}
    showOwner
  />
);

export default StuffsBidded;
