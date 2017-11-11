import React from 'react';
import { connect } from 'react-redux';
import Stuff from './Stuff';

const Borrowed = props => (
  <div>
    {props.bids.map(stuff => (
      <Stuff key={stuff.id} stuff={stuff} />
    ))}
  </div>
);

const mapStateToProps = state => ({
  borrowed: state.user.stuffBorrowed,
});

export default connect(mapStateToProps)(Borrowed);
