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
    {moment(stuff.status.charAt(0).toUpperCase() + stuff.status.slice(1)).format('D MMM YY')}
  </td>
);

const Bidder = ({ stuff }) => (
  <td><Link to={`/users/${stuff.username}`}>{stuff.username}</Link></td>
);

const Accept = ({ stuff, ...props }) => (
  <td>
    <Button
      onClick={() => props.acceptBid(stuff.id, stuff.username)}
      bsStyle="primary"
    >
      Accept
    </Button>
  </td>
);

const Deny = ({ stuff, ...props }) => (
  <td>
    <Button
      onClick={() => props.denyBid(stuff.id, stuff.username)}
      bsStyle="primary"
    >
      Deny
    </Button>
  </td>
);

const AcceptConnected = connect(null, { acceptBid })(Accept);
const DenyConnected = connect(null, { denyBid })(Deny);

const StuffsWithBids = props => (
  <Stuffs
    stuffs={props.stuffs}
    extra={[BidDate, Status, Bidder, AcceptConnected, DenyConnected]}
    extraHeaders={['Bid date', 'Status', 'Bidder']}
    showOwner
  />
);

export default StuffsWithBids;
