function allStuffData() {
	return `SELECT * FROM stuff AS s, user AS u WHERE s.owner=u.id`;
}

function getStuffData(stuffId) {
  return `SELECT * FROM stuff AS s, user AS u WHERE u.id=s.owner AND s.id=${stuffId}`;
}

function addStuff(stuffDetails) {
  const keyValues = getCommaSeparatedKeysValues(stuffDetails);
  return `INSERT INTO stuff (${keyValues[0]}) VALUES (${keyValues[1]})`;
}

function deleteStuff(stuffId) {
	return `DELETE FROM stuff WHERE id=${stuffId}`;
}

function updateStuff(stuffId, stuffDetails) {
	return `UPDATE stuff SET${paramsToString(params)} WHERE id=${stuffId}`;
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
    list.push(`s.location IN (?)`, filterList.location);
  }
  if (filterList.availableDate) {
    list.push(`s.available_from <= "${filterList.availableDate}"`);
  }
  if (filterList.maxLoan) {
    list.push(`s.max_loan_period >= ${filterList.maxLoan}`);
  }
  if (filterList.owner) {
    list.push(`s.owner = "${filterList.owner}"`);
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
  for (var key in params) {
    keys.push(key);
    values.push(params[key]);
  }
  return [keys.join(), values.join()];
}

module.exports = {
	allStuffData,
	getStuffData,
	addStuff,
	deleteStuff,
	updateStuff,
	getFilteredStuff,
	getPages: 'SELECT COUNT(*) FROM stuff',
};