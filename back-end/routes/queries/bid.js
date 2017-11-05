function getAllBidData() {
	return `SELECT * FROM bid_log ORDER BY bid_amt DESC`;
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

function paramsToString(params) {
  let query = '';
  for (var key in params) {
    if(params[key]) {
      query += ` ${key}=${params[key]},`;
    }
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

module.exports = {
	getAllBidData,
	getAllMyBids,
	getBidsFor,
	bidForStuff,
	setBidWinner,
};

