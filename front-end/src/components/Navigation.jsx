import React from 'react';
import { Navbar, NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import PostNew from './PostNew';

const Navigation = props => (
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a tabIndex={0} role="link" onClick={() => props.push('')}>Stuff Sharing</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullLeft>
        <NavItem onClick={() => props.push('')}>Home</NavItem>
      </Nav>
      {props.username
       ?
         <Nav pullRight>
           <NavItem onClick={() => props.push('login')}>Post new stuff</NavItem>

           <NavDropdown title={props.username} id="user">
             <MenuItem onClick={props.logout}>Log out</MenuItem>
           </NavDropdown>
         </Nav>

       :
         <Nav pullRight>
           <NavItem onClick={() => props.push('login')}>Login/Register</NavItem>
         </Nav>
      }

    </Navbar.Collapse>
    <PostNew />
  </Navbar>
);

export default Navigation;
