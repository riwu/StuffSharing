import conn from './connection';

const express = require('express');
const queries = require('./queries/users');

const router = express.Router();

router.post('/login', (req, res, next) => {
  const login = { username: req.body.username, password: req.body.password };
  const response = queries.loginUser(login);
  return response.then((data) => {
    console.log(`Login Data: ${data}`);
    if (data && data.length > 0) {
      res.send(data[0]);
    } else {
      res.status(401).end();
    }
  });
});

router.post('/register', (req, res, next) => {
  const register = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    first_name: req.body.firstName,
    last_name: req.body.lastName,
  };
  const response = queries.checkUsername(register);
  return response.then((data) => {
    if (data && data.length > 0) {
      res.status(409).end();
    } else {
      const response2 = queries.registerUser(register);
      response2.then((data) => {
        console.log('sending data', data);
        res.send({ id: data.insertId });
      });
    }
  });
});

// router.get('/loans', (req, res, next) => {
//   const response = conn.query(queries.allLoanData);
//   return response.then(data => res.send(data));
// });

module.exports = router;
