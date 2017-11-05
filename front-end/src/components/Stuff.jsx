import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Stuff = ({ stuff }) => {
  const ownerLink = <Link to={`/users/${stuff.username}`}>{stuff.username}</Link>;
  return (
    <div className="stuff">
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
  );
};

export default Stuff;
