import conn from './connection';

const express = require('express');
const queries = require('./queries');

const router = express.Router();

router.get('/login', (req, res, next) => {
	const login = {'username': req.body.username, 'password': req.body.password};
	const response = conn.query(queries.loginUser(login));
	return response.then(data => {
		console.log("Login Data: " + data);
		if (data && data.length > 0) {
			res.end();
		} else {
			res.status(500);
		}
	 });
});

router.get('/register', (req, res, next) => {
	const register = {'username': req.body.username, 'password': req.body.password,
						'email': req.body.email, 'firstName': req.body.firstName,
						'lastName': req.body.lastName};
	const response = conn.query(queries.checkUsername(register.username));
	return response.then(data => {
		if (data && data.length > 0) {
			res.status(500);
		} else {
			const response2 = conn.query(queries.registerUser(register));
			response2.then(data => res.end());
		}
		res.send(data)
	});
});

router.get('/', (req, res, next) =>
	// view homepage
   res.send('Welcome to Stuff Sharing'),
  // const response = createConnection.then(connection => connection.query('SELECT * FROM table1'))
  // return response.then(data => res.send(data));
);


// router.get('/me/update', function(req, res, next) {
// 	// update my name password or email
// 	// cannot change username
// });



router.get('/loans', (req, res, next) => {
  const response = conn.query(queries.allLoanData);
  return response.then(data => res.send(data));
});

module.exports = router;
