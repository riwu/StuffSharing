import conn from '../connection';

function allStuffData() {
	return `SELECT s.*, u.username FROM stuff AS s, user AS u WHERE s.owner=u.id`;
}

function getStuffData(stuffId) {
  return `SELECT s.*, u.username FROM stuff AS s, user AS u ` +
            `WHERE s.owner=u.id AND s.id=${stuffId}`;
}

function addStuff(stuffDetails) {
  const names = '(name,desc,category,condition,location,owner,price,available_from,max_loan_period)';
  const values = `("${stuffDetails.name}","${stuffDetails.desc}","${stuffDetails.category}",${stuffDetails.condition},"${stuffDetails.location}",` +
   ` (${getUserId(stuffDetails.owner)}),${stuffDetails.price},"${stuffDetails.available_from}",${stuffDetails.max_loan_period})`;
   return conn.query("INSERT INTO stuff ? VALUES ?", [names, values]);
}

function deleteStuff(stuffId) {
	return `DELETE FROM stuff WHERE id=${stuffId}`;
}

function updateStuff(stuffId, stuffDetails) {
	return `UPDATE stuff SET${paramsToString(params)} WHERE id=${stuffId}`;
}

function updateStuffLoan(stuffId, loanDate) {
  return `UPDATE stuff SET available_from=ADDDATE(${loanDate}, max_loan_period)` +
          ` WHERE id=${stuffId}`;
}

function getFilteredStuff(filterList) {
  var query = 'SELECT s.*, u.username FROM user AS u, stuff AS s WHERE ';
  const list = ['s.owner=u.id'];
  var order;
  console.log(filterList);
  if (filterList.name) {
    list.push(`(s.name LIKE "%${filterList.name}%" OR s.desc LIKE "%${filterList.name}%")`);
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
    list.push(`s.location IN (?)`, filterList.location);
  }
  if (filterList.availableDate) {
    list.push(`s.available_from <= "${filterList.availableDate}"`);
  }
  if (filterList.maxLoan) {
    list.push(`s.max_loan_period >= ${filterList.maxLoan}`);
  }
  if (filterList.owner) {
    list.push(`s.owner=(SELECT id FROM user WHERE username="${filterList.owner}")`);
  }
  query += list.join(' AND ');
  var order = 'DESC';
  if (filterList.asc) {
    order = 'ASC';
  }
  query = `${query} ORDER BY s.${filterList.sort} ${order}`;
  const startIndex = (filterList.page - 1) * filterList.count;
  const endIndex = filterList.page * filterList.count;
  query = `${query} LIMIT ${startIndex}, ${endIndex}`;
  return query;
}

function paramsToString(params) {
  let query = '';
  for (var key in params) {
    if(params[key] && key!='owner' && !key.startsWith("user")) {
      query += ` ${key}=${params[key]},`;
    }
  }
  return query.slice(0, -1);
}

function getCommaSeparatedKeysValues(params) {
  let keys = [],
    values = [];
  for (var key in params) {
    keys.push(key);
    values.push(params[key]);
  }
  return [keys.join(), values.join()];
}

function getUserId(username) {
  return `SELECT id FROM user WHERE username="${username}"`;
}

module.exports = {
	allStuffData,
	getStuffData,
	addStuff,
	deleteStuff,
	updateStuff,
  updateStuffLoan,
	getFilteredStuff,
	getPages: 'SELECT COUNT(*) FROM stuff',
};