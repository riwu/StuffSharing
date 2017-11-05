import React from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-paginate';
import Stuff from './Stuff';
import './Stuffs.css';
import Search from './SearchContainer';
import { setFilter, getStuffs } from '../actions';

const Stuffs = props => (
  <div className="Stuffs">
    <Search />
    <div>
      {props.stuffs.data.map(stuff => (
        <Stuff key={stuff.id} stuff={stuff} />
    ))}
      <Pagination
        onPageChange={({ selected }) => {
          props.setFilter('page', selected);
          props.getStuffs({ ...props.search, page: selected + 1 });
        }}
        pageCount={props.stuffs.pages}
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
  </div>
);

const mapStateToProps = state => ({
  stuffs: state.stuffs,
  search: state.search,
});

export default connect(mapStateToProps, { setFilter, getStuffs })(Stuffs);
