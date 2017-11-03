import React from 'react';
import { Link } from 'react-router-dom';

const Stuff = ({ stuff }) => {
  const ownerLink = <Link to={`/users/${stuff.username}`}>{stuff.username}</Link>;
  return (
    <div key={stuff.id} className="stuff">
      <div>Name: {stuff.name}</div>
      <div>Description: {stuff.desc}</div>
      <div>Price: ${stuff.price}</div>
      <div>Location: {stuff.location}</div>
      <div>Condition: {stuff.condition}</div>
      <div>Owner: {ownerLink}</div>
      <div>Available from: {stuff.available_from}</div>
      <div>Max loan period: {stuff.max_loan_period} days</div>
    </div>
  );
};

export default Stuff;
