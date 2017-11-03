import React from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-paginate';
import { Button } from 'react-bootstrap';
import Stuff from './Stuff';
import './Stuffs.css';
import Search from './SearchContainer';
import Login from './Login';

const Stuffs = props => (
  <div>
    <h1>Stuff catalogue</h1>
    <Login />
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
