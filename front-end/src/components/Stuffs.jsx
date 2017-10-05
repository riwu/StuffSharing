import React from 'react';
import { connect } from 'react-redux';
import './Stuffs.css';

class App extends React.Component {
  render() {
    const props = this.props;
    return (
      <div>
        <h1>Stuff catalogue</h1>
        {props.stuffs.map(stuff => (
          <div key={stuff.id} className="stuff">
            <div>Name: {stuff.name}</div>
            <div>Description: {stuff.desc}</div>
            <div>Price: ${stuff.price}</div>
            <div>Location: {stuff.location}</div>
            <div>Condition: {stuff.condition}</div>
            <div>Owner: {stuff.owner}</div>
            <div>Available from: {stuff.available_from}</div>
            <div>Max loan period: {stuff.max_loan_period}</div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stuffs: state.stuffs,
});

export default connect(mapStateToProps)(App);
