function getAllBidData() {
	return `SELECT * FROM bid_log ORDER BY bid_amt DESC`;
}

function getAllMyBids(username) {
  return `${'SELECT b.*, s.*, u.username, u.email FROM bid_log AS b, stuff AS s, user AS u ' +
				'WHERE b.stuff_id=s.id AND s.owner AND u.id == s.owner AND u.username='}${username}`;
}

function getBidsFor(username, stuffId) {
  return `${getAllMyBids(username)} s.id=${stuffId}`;
}

function bidForStuff(bidDetails){
  console.log(bidDetails);
  var q = `INSERT INTO bid_log (bid_amt, user_id, stuff_id) VALUES (` +
            `${bidDetails.bidAmt},(${getUserId(bidDetails.user)}),` + 
            `${bidDetails.stuffId})`;
  return q;
}

function updateBidLog(bidDetails){
  return `UPDATE bid_log b SET b.bid_amt=${bidDetails.bidAmt}` + 
              ` WHERE b.stuff_id=${bidDetails.stuffId}` + 
              ` AND b.user_id=(${getUserId(bidDetails.user)})`;
}

function deleteBidLog(bidDetails) {
  return `DELETE FROM bid_log WHERE stuff_id=${bidDetails.stuffId} AND date_and_time=${bidDetails.timestamp}` +
          ` AND user_id=(${getUserId(bidDetails.user)})`;
}

function getUserId(username) {
  return `SELECT id FROM user WHERE username="${username}"`;
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

  updateBidLog,
  deleteBidLog,
};

