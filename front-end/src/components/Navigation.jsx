import React from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';

const Navigation = props => (
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <div onClick={() => props.push('')}>Stuff Sharing</div>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullLeft>
        <NavItem onClick={() => props.push('')}>Home</NavItem>
      </Nav>
      <Nav pullRight>
        {props.username
          ? <NavItem onClick={() => props.logout()}>{props.username}</NavItem>
          : <NavItem onClick={() => props.push('login')}>Login/Register</NavItem>
        }

      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Navigation;
