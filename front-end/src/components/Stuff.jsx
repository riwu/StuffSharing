import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { withStateHandlers } from 'recompose';
import moment from 'moment';
import './Stuff.css';
import { deleteStuff } from '../actions';
import Bid from './Bid';

const addState = withStateHandlers(
  {
    deleted: false,
    showBid: false,
  },
  {
    delete: () => () => ({
      deleted: true,
    }),
    toggleBid: ({ showBid }) => () => ({
      showBid: !showBid,
    }),
  },
);

const Stuff = ({ stuff, user, ...props, route }) => {
  const ownerLink = <Link to={`/users/${stuff.username}`}>{stuff.username}</Link>;
  console.log('user', user, route);
  return (
    <div className="Stuff">
      <div>
        <div>Name: {stuff.name}</div>
        <div>Description: {stuff.desc}</div>
        <div>Category: {stuff.category}</div>
        <div>Price: ${stuff.price}</div>
        <div>Location: {stuff.location}</div>
        <div>Condition: {stuff.condition}</div>
        <div>Owner: {ownerLink}</div>
        <div>Available from: {moment(stuff.available_from).format('D MMM YY')}</div>
        <div>Max loan period: {stuff.max_loan_period} days</div>
      </div>
      {user.username === stuff.username ?
        <div className="button">
          <Button
            onClick={() => props.deleteStuff(stuff.id, user)}
            bsStyle="primary"
            disabled={props.deleted}
          >
            {props.deleted ? 'Deleted' : 'Delete'}
          </Button>
        </div> :
        <div className="button">
          <Button bsStyle="primary" onClick={props.toggleBid}>Bid</Button>
        </div>
      }
      <Bid show={props.showBid} onHide={props.toggleBid} name={stuff.name} />
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user.info,
  route: state.route,
});

export default connect(mapStateToProps, { deleteStuff })(addState(Stuff));
