import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { withStateHandlers } from 'recompose';
import { push } from 'react-router-redux';
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

const Stuff = ({ stuff, ...props }) => {
  const ownerLink = <Link to={`/users/${stuff.username}`}>{stuff.username}</Link>;
  console.log('stuff', stuff);
  return (
    <div className="Stuff">
      <div>
        <div>Name: {stuff.name}</div>
        <div>Description: {stuff.desc}</div>
        <div>Category: {stuff.category}</div>
        <div>Price: ${stuff.price}</div>
        <div>Location: {stuff.location}</div>
        <div>Condition: {stuff.condition}</div>
        {!(props.route.location.pathname || '').includes(stuff.username) && <div>Owner: {ownerLink}</div>}
        <div>Available from: {moment(stuff.available_from).format('D MMM YY')}</div>
        <div>Max loan period: {stuff.max_loan_period} days</div>
      </div>
      {props.username === stuff.username ?
        <div className="button">
          <Button
            onClick={() => props.deleteStuff(stuff.id)}
            bsStyle="primary"
            disabled={props.deleted}
          >
            {props.deleted ? 'Deleted' : 'Delete'}
          </Button>
        </div> :
        <div className="button">
          <Button
            bsStyle="primary"
            onClick={() => {
              console.log('bidding');
              if (props.username === undefined) {
                props.push('/login');
                return;
              }
              props.toggleBid();
            }}
          >Bid</Button>
        </div>
      }
      <Bid show={props.showBid} onHide={props.toggleBid} stuff={stuff} />
    </div>
  );
};

const mapStateToProps = state => ({
  username: state.user.info.username,
  route: state.route,
});

export default connect(mapStateToProps, { deleteStuff, push })(addState(Stuff));
