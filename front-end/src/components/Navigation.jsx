import React from 'react';
import { Navbar, NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { withStateHandlers } from 'recompose';
import PostNew from './PostNew';

const addState = withStateHandlers(
  {
    showPostModal: false,
  },
  {
    togglePostModal: ({ showPostModal }) => () => ({
      showPostModal: !showPostModal,
    }),
  },
);

const Navigation = props => (
  <Navbar inverse collapseOnSelect fixedTop>
    <Navbar.Header>
      <Navbar.Brand>
        <a tabIndex={0} role="link" onClick={() => props.push('')}>Stuff Sharing</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullLeft>
        <NavItem onClick={() => props.push('/faq')}>FAQ</NavItem>
      </Nav>
      {props.username
       ?
         <Nav pullRight>
           <NavItem onClick={props.togglePostModal}>Post new item</NavItem>
           <NavItem onClick={() => props.push(`/users/${props.username}`)}>Profile</NavItem>

           <NavDropdown title={props.username} id="user">
             <MenuItem onClick={props.logout}>Log out</MenuItem>
           </NavDropdown>
         </Nav>

       :
         <Nav pullRight>
           <NavItem onClick={() => props.push('/login')}>Login/Register</NavItem>
         </Nav>
      }

    </Navbar.Collapse>
    <PostNew show={props.showPostModal} onHide={props.togglePostModal} />
  </Navbar>
);

export default addState(Navigation);
