import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { acceptBid, denyBid } from '../actions';
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

const Bidder = ({ stuff }) => (
  <td><Link to={`/users/${stuff.bidder_username}`}>{stuff.bidder_username}</Link></td>
);

const Actions = ({ stuff, ...props }) => (
  <td style={{ display: 'flex' }}>
    <Button
      style={{ marginRight: '5px' }}
      onClick={() => props.acceptBid(stuff.id, stuff.bidder_username)}
      bsStyle="primary"
    >
        Accept
      </Button>
    <Button
      onClick={() => props.denyBid(stuff.id, stuff.bidder_username)}
      bsStyle="danger"
    >
        Deny
      </Button>
  </td>
);

const ActionsConnected = connect(null, { acceptBid, denyBid })(Actions);

const StuffsWithBids = props => (
  <Stuffs
    stuffs={props.stuffs}
    extra={[BidDate, Status, Bidder, ActionsConnected]}
    extraHeaders={['Bid date', 'Status', 'Bidder']}
  />
);

export default StuffsWithBids;
