import React from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-paginate';
import Stuff from './Stuff';
import './Stuffs.css';
import Search from './SearchContainer';
import { setFilter, getStuffs } from '../actions';

const Stuffs = props => (
  <div>
    <Search />
    {props.stuffs.map(stuff => (
      <Stuff stuff={stuff} />
    ))}
    <Pagination
      onPageChange={({ selected }) => {
        props.setFilter('page', selected);
        props.getStuffs({ ...props.search, page: selected + 1 });
      }}
      pageCount={10}
      forcePage={props.search.page}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      breakLabel={<a href="">...</a>}
      breakClassName={'break-me'}
      containerClassName={'pagination'}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'}
    />
  </div>
);

const mapStateToProps = state => ({
  stuffs: state.stuffs,
  search: state.search,
});

export default connect(mapStateToProps, { setFilter, getStuffs })(Stuffs);
