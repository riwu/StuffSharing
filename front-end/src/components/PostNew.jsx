import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const PostNew = props => (
  <Modal show={false} onHide={this.close}>
    <Modal.Header closeButton>
      <Modal.Title>Post new stuff</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      test
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={this.close}>Close</Button>
    </Modal.Footer>
  </Modal>
);

export default PostNew;
