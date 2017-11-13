import conn from './connection';

const express = require('express');
const queries = require('./queries/users.js');
const stuff = require('./queries/stuff.js');
const utils = require('./utils');

const router = express.Router();

router.param('username', (req, res, next, username) => {
  req.username = null;
  if (username.length > 0) {
    req.username = username;
  }
  next();
});


router.post('/add/stuff', (req, res, next) => {
	// Add new stuff
  utils.isValidUser(req.body.user).then((isValid) => {
    if (!isValid) {
      console.log('unauthorized');
      return res.status(403).end();
    }

    const stuffInfo = {
      name: req.body.name,
      desc: req.body.desc,
      condition: req.body.condition,
      category: req.body.category,
      location: req.body.location,
      owner: req.body.user.id,
      price: req.body.price,
      available_from: req.body.available_from,
      max_loan_period: req.body.max_loan_period };
    console.log('stuff info', stuffInfo);
    const response = stuff.addStuff(stuffInfo);
    return response.then((data) => {
      console.log('sending back', data);
      res.send({ id: data.insertId, username: req.body.user.username });
    });
  });
});

router.post('/stuff/delete', (req, res, next) => {
	// Delete this stuff
  utils.isValidUser(req.body.user).then((isValid) => {
    if (!isValid) {
      console.log('unauthorized');
      return res.status(403).end();
    }

    console.log('Delete Stuff');
    const response = conn.query(stuff.deleteStuff(req.body.stuffId));
    return response.then(data => res.send(data));
  });
});

router.post('/stuff/:stuffId/update', (req, res, next) => {
	// Update this stuff
  utils.isValidUser(req.body.user).then((isValid) => {
    if (!isValid) {
      console.log('unauthorized');
      return res.status(403).end();
    }

    const stuffInfo = {
      name: req.body.name,
      desc: req.body.desc,
      condition: req.body.condition,
      category,
  	  location: req.body.location,
      owner: req.body.user.username,
      price: req.body.price,
  		available_from: req.body.available_from,
      max_loan_period: req.body.max_loan_period };
    const response = conn.query(update.updateStuff(stuffId, stuffInfo));
    return response.then(data => res.send(data));
  });
});

function arrangeValues(listValues) {
  return {
    stuffBorrowed: { data: listValues[0], pageCount: 0 },
    stuffLent: { data: listValues[1], pageCount: 0 },

    totalEarning: listValues[2],

    bidsEarned: { data: listValues[3], pageCount: 0 },

    totalSpent: listValues[4],

    bidsMade: { data: listValues[5], pageCount: 0 },

    mostPopular: listValues[6],
    favoriteCategory: listValues[7],
    info: listValues[8][0],

    stuffs: { data: listValues[9], pageCount: 0 },
  };
}

function getUserInfo(username) {
  const qs = [
    queries.stuffBorrowed(username),
    queries.stuffLent(username),
    queries.totalEarned(username),
    queries.bidsEarned(username),
    queries.totalSpent(username),
    queries.bidsMade(username),
    queries.mostPopularStuff(username),
    queries.favouriteCategory(username),
    queries.getUserData(username),
    queries.getUserStuff(username),
  ];
  const promiseList = [];
  for (const query in qs) {
    promiseList.push(conn.query(qs[query]));
  }
  return promiseList;
}

export const getUserAllDataHelper = (username) => {
  const list = getUserInfo(username);
  return Promise.all(list).then(values => arrangeValues(values));
};

router.get('/:username', (req, res, next) => {
  getUserAllDataHelper(req.username).then(data => res.send(data));
});

/* GET users listing. */
router.get('/', (req, res, next) => {
  const response = conn.query(queries.allSafeUserData());
  return response.then(data => res.send(data));
});

module.exports = router;
