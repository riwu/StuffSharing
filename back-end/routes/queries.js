import conn from './connection';

function getUserData(username) {
  return `SELECT * FROM stuff WHERE owner=${username}`;
}

function updateUserDetails(username, params) {
  return `UPDATE user SET${paramsToString(params)} WHERE username=${username}`;
}

function deleteUser(username) {
  return `DELETE FROM user WHERE username=${username}`;
}

function getStuffData(stuffId) {
  return `SELECT * FROM stuff AS s, user AS u WHERE u.id=s.owner AND s.id=${stuffId}`;
}

function addStuff(stuffDetails) {
  const keyValues = getCommaSeparatedKeysValues(stuffDetails);
  return `INSERT INTO stuff (${keyValues[0]}) VALUES (${keyValues[1]})`;
}

function updateStuffDetails(stuffId, params) {
  return `UPDATE stuff SET${paramsToString(params)} WHERE id=${stuffId}`;
}

function deleteStuff(stuffId) {
  return `DELETE FROM stuff WHERE id=${stuffId}`;
}

function getAllMyBids(username) {
  return `${'SELECT * from bid_log AS b, stuff AS s, user AS u ' +
				'WHERE b.stuff_id=s.id AND s.owner AND u.id == s.owner AND u.username='}${username}`;
}

function getBidsFor(username, stuffId) {
  return `${getAllMyBids(username)} s.id=${stuffId}`;
}

function bidForStuff(stuffId, params) {
  const keyValues = getCommaSeparatedKeysValues(params);
  return `INSERT INTO bid_log (${keyValues[0]}) VALUES (${keyValues[1]}) WHERE id=${stuffId}`;
}

function setBidWinner(bidDetails) {

}

function addLoanLog(params) {
  const keyValues = getCommaSeparatedKeysValues(params);
  return `INSERT INTO loan_log (${keyValues[0]}) VALUES (${keyValues[1]})`;
}

function getFilteredStuff(filterList) {
  var query = 'SELECT * FROM user AS u, stuff AS s WHERE ';
  const list = ['s.owner=u.id'];
  var order;
  console.log(filterList);
  if (filterList.name) {
    list.push(`s.name LIKE "%${filterList.name}%"`);
  }
  if (filterList.category) {
    list.push(`s.location LIKE "%${filterList.category}%"`);
  }
  if (filterList.priceLow) {
    list.push(`s.price >= ${filterList.priceLow}`);
  }
  if (filterList.priceHigh) {
    list.push(`s.price <= ${filterList.priceHigh}`);
  }
  if (filterList.conditionLow) {
    list.push(`s.condition >=${filterList.conditionLow}`);
  }
  if (filterList.conditionHigh) {
    list.push(`s.condition <= ${filterList.conditionHigh}`);
  }
  if (filterList.location) {
    list.push(`s.location LIKE "%${filterList.location}%"`);
  }
  if (filterList.availableDate) {
    list.push(`s.available_from <= "${filterList.availableDate}"`);
  }
  if (filterList.maxLoan) {
    list.push(`s.max_loan_period >= ${filterList.maxLoan}`);
  }
  if (filterList.owner) {
    list.push(`s.owner LIKE "%${filterList.owner}%"`);
  }
  query += list.join(' AND ');
  var order = 'DESC';
  if (filterList.asc) {
    order = 'ASC';
  }
  query = `${query} ORDER BY s.${filterList.sort} ${order}`;
  const startIndex = (filterList.page - 1) * filterList.count;
  const endIndex = filterList.page * filterList.count;
  var query = `${query} LIMIT ${startIndex}, ${endIndex}`;
  return query;
}

function paramsToString(params) {
  let query = '';
  for (const key in params) {
    query += ` ${key}=${params[key]},`;
  }
  return query.slice(0, -1);
}

function getCommaSeparatedKeysValues(params) {
  let keys = [],
    values = [];
  for (const key in params) {
    keys.push(key);
    values.push(params[key]);
  }
  return [keys.join(), values.join()];
}


function loginUser(login) {
  return conn.query('SELECT * FROM user u WHERE u.username = ? AND u.password = ?', [login.username, login.password]);
}

function checkUsername(user) {
  return conn.query('SELECT * FROM user u WHERE u.username = ? or u.email = ?', [user.username, user.email]);
}

function registerUser(details) {
  return conn.query('INSERT INTO user SET ?', details);
}

module.exports = {
  allSafeUserData: 'SELECT id, username, email, first_name, last_name FROM user',
  allUserData: 'SELECT * FROM user',
  allStuffData: 'SELECT * FROM stuff AS s, user AS u WHERE s.owner=u.id',
  allBidData: 'SELECT * FROM bid_log ORDER BY bid_amt DESC',
  allLoanData: 'SELECT * FROM loan_log ORDER BY loan_date',

  addStuff,

  getUserData,
  getStuffData,

  updateUserDetails,
  updateStuffDetails,

  deleteUser,
  deleteStuff,

  getAllMyBids,
  getBidsFor,
  bidForStuff,
  setBidWinner,
  addLoanLog,

  getFilteredStuff,

  loginUser,
  checkUsername,
  registerUser,

  getPages: 'SELECT COUNT(*) FROM stuff',
};
