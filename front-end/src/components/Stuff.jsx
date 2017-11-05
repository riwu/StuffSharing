import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import './Stuff.css';

const Stuff = ({ stuff }) => {
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
      <div className="button">
        <Button bsStyle="primary">Bid</Button>
      </div>
    </div>

  );
};

export default Stuff;
