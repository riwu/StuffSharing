function cleanQueryList (queries) {
	const defaultValues = {'name': undefined, 'count': 20, 'page': 1, 'sort': 'name',
						'asc': true, 'availableDate': undefined, 'maxLoan': undefined,
						'category': undefined, 'priceHigh': undefined, 'priceLow': 0,
						'conditionLow': 0, 'conditionHigh': 5, 'owner': undefined, 
						'location': undefined};
	
	for(var key in defaultValues) {
		if(!queries.hasOwnProperty(key) || queries[key]==null || queries[key]==undefined) {
			queries[key] = defaultValues[key];
		}
	}
	return queries;
}

module.exports = {
	cleanQueryList: cleanQueryList,
};