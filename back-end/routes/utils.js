import conn from './connection';

const stuff = require('./queries/stuff');
const users = require('./queries/users');

function cleanQueryList(queries) {
  const defaultValues = { name: undefined,
    count: 20,
    page: 1,
    sort: 'name',
    asc: true,
    availableDate: undefined,
    maxLoan: undefined,
    category: undefined,
    priceHigh: undefined,
    priceLow: 0,
    conditionLow: 0,
    conditionHigh: 5,
    owner: undefined,
    location: undefined };

  for (const key in defaultValues) {
    if (!queries.hasOwnProperty(key) || queries[key] == null || queries[key] == undefined) {
      queries[key] = defaultValues[key];
    }
  }
  return queries;
}

function isValidUser(details) {
  const response = conn.query(users.checkUser(details));
  return response.then((data) => {
    console.log('Test: ', data);
    return data.length > 0;
  });
}

function isAdmin(details) {
  const response = conn.query(users.checkUser(details));
  return response.then(data => data.length > 0 && data[0].isAdmin);
}

module.exports = {
  cleanQueryList,
  isValidUser,
  isAdmin,
};
