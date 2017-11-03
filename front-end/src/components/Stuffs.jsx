import React from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-paginate';
import Stuff from './Stuff';
import './Stuffs.css';
import Search from './SearchContainer';

const Stuffs = props => (
  <div>
    <Search />
    {props.stuffs.map(stuff => (
      <Stuff stuff={stuff} users={props.users} />
    ))}
    <Pagination
      onPageChange={({ selected }) => {}}
      pageCount={10}
      initialPage={0}
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
  users: state.users,
});

export default connect(mapStateToProps)(Stuffs);
