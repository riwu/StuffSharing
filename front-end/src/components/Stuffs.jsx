import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Stuffs.css';

class App extends React.Component {
  render() {
    const props = this.props;
    return (
      <div>
        <h1>Stuff catalogue</h1>
        {props.stuffs.map((stuff) => {
          const owner = (props.users.find(user => user.id === stuff.owner) || {}).username;
          const ownerLink = <Link to={`/users/${owner}`}>{owner}</Link>;
          return (
            <div key={stuff.id} className="stuff">
              <div>Name: {stuff.name}</div>
              <div>Description: {stuff.desc}</div>
              <div>Price: ${stuff.price}</div>
              <div>Location: {stuff.location}</div>
              <div>Condition: {stuff.condition}</div>
              <div>Owner: {ownerLink}</div>
              <div>Available from: {stuff.available_from}</div>
              <div>Max loan period: {stuff.max_loan_period}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stuffs: state.stuffs,
  users: state.users,
});

export default connect(mapStateToProps)(App);
