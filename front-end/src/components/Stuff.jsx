import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { withStateHandlers } from 'recompose';
import moment from 'moment';
import './Stuff.css';
import api from '../actions/api';

const addState = withStateHandlers(
  {
    deleted: false,
  },
  {
    delete: () => () => ({
      deleted: true,
    }),
  },
);

const Stuff = ({ stuff, user, ...props }) => {
  const ownerLink = <Link to={`/users/${stuff.username}`}>{stuff.username}</Link>;
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
            onClick={() => {
              api.deleteStuff(stuff.id, user)
                .then(() => props.delete())
                .catch(e => alert('Failed to delete', e.message));
            }}
            bsStyle="primary"
            disabled={props.deleted}
          >
            {props.deleted ? 'Deleted' : 'Delete'}
          </Button>
        </div> :
        <div className="button">
          <Button bsStyle="primary">Bid</Button>
        </div>
      }
    </div>

  );
};

const mapStateToProps = state => ({
  user: state.user.login,
});

export default connect(mapStateToProps)(addState(Stuff));
