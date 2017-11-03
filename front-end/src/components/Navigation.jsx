import React from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

const Navigation = props => (
  <Navbar inverse collapseOnSelect>
    <Navbar.Collapse>
      <Nav pullLeft>
        <NavItem onClick={() => props.navigate('')}>Home</NavItem>
      </Nav>
      <Nav pullRight>
        <NavItem onClick={() => props.navigate('login')}>Login/Register</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default connect(null, {
  navigate: push,
})(Navigation);
