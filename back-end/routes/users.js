import conn from './connection';

const express = require('express');
const queries = require('./queries');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  const response = conn.query(queries.allSafeUserData);
  return response.then(data => res.send(data));
});

router.get('/:username', (req, res, next) => {
  const response = conn.query(queries.getUserData(req.params.username));
  return response.then(data => res.send(data));
});

module.exports = router;
