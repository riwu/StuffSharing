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
  <td>
    <Button
      onClick={() => {
        if (props.username === stuff.username) {
          props.deleteStuff(stuff.id);
        } else {
          if (props.username === undefined) {
            props.push('/login');
            return;
          }
          props.toggleBid();
        }
      }}
      bsStyle="primary"
    >
      {props.username === stuff.username ? 'Delete' : 'Bid'}
    </Button>
    <Bid show={props.showBid} onHide={props.toggleBid} stuff={stuff} />
  </td>
);

const mapStateToProps = state => ({
  username: state.user.info.username,
});

const StuffChildrenConnected = connect(mapStateToProps, {
  deleteStuff,
  push,
})(addState(StuffChildren));

const StuffsListed = props => (
  <Stuffs {...props} extra={StuffChildrenConnected} />
  );

export default StuffsListed;
