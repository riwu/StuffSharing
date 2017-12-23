import conn from './connection';

const express = require('express');
const bid = require('./queries/bid');
const loan = require('./queries/loan');
const stuff = require('./queries/stuff');
const users = require('./queries/users');
const utils = require('./utils');

const router = express.Router();

router.get('/:username/:stuffId', (req, res, next) => {
  utils.isValidUser(req.body.user).then((isValid) => {
    if (!isValid) {
      console.log('unauthorized');
      return res.status(403).end();
    }
    const response = conn.query(bid.getCurrentBidsFor(username, stuffId));
    return response.then(data => res.send(data));
  });
});

router.post('/update', (req, res, next) => {
  utils.isValidUser(req.body.user).then((isValid) => {
    if (!isValid) {
      console.log('unauthorized');
      return res.status(403).end();
    }
    var params = {email: req.body.email, first_name: req.body.first_name, last_name: req.body.last_name};
    const response = conn.query(users.updateUser(req.body.user.username, params));
    response.then(data => res.send(data));
  });
});

router.get('/:username', (req, res, next) => {
  // Get all the bids on my products
  utils.isValidUser(req.body.user).then((isValid) => {
    if (!isValid) {
      console.log('unauthorized');
      return res.status(403).end();
    }    
  const response = conn.query(bid.getAllMyBids(req.body.user.username));
  return response.then(data => res.send(data));
  });
});

module.exports = router;
