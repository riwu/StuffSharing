import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { withStateHandlers } from 'recompose';
import { push } from 'react-router-redux';
import { deleteStuff } from '../actions';
import Bid from './Bid';
import Stuffs from './Stuffs';

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

const StuffChildren = ({ stuff, ...props }) => (
  <div>
    {props.username === stuff.username ?
      <div>
        <Button
          onClick={() => props.deleteStuff(stuff.id)}
          bsStyle="primary"
        >
          {props.deleted ? 'Deleted' : 'Delete'}
        </Button>
      </div> :
      <div>
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

const mapStateToProps = state => ({
  username: state.user.info.username,
});

const StuffChildrenConnected = connect(mapStateToProps, {
  deleteStuff,
  push,
})(addState(StuffChildren));

const StuffsListed = props => (
  <Stuffs stuffs={props.stuffs} extra={StuffChildrenConnected} />
);

export default StuffsListed;
