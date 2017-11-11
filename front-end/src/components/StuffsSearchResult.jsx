import React from 'react';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';
import Stuffs from './StuffsListed';
import { getStuffs, setNotNewVisit, setFilter } from '../actions';
import './StuffsSearchResult.css';

const addLifeCycle = lifecycle({
  componentDidMount() {
    const props = this.props;
    if (!props.newVisit) return;
    console.log('new visit');
    props.setNotNewVisit();
    if (props.stuffs.data.length === 0) {
      props.getStuffs(props.search);
    }
  },
});

const StuffsSearchResult = (props) => {
  if (props.stuffs.data.length === 0) {
    return (
      <h1 className="StuffsSearchResult">
        <p>No results found!</p>
        <p>Try changing your search criteria.</p>
      </h1>
    );
  }
  return (
    <Stuffs {...props} showOwner />
  );
};

const mapStateToProps = state => ({
  stuffs: state.stuffs,
  search: state.search,
  newVisit: state.newVisit,
});

export default connect(mapStateToProps, {
  getStuffs,
  setNotNewVisit,
  setFilter,
})(addLifeCycle(StuffsSearchResult));
