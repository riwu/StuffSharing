import conn from './connection';

const express = require('express');
const queries = require('./queries');

const router = express.Router();

const filterString = '\?name={name}&count={count}&page={page}&sort={sort}&asc={asc}&
				category={category}&priceLow={priceLow}&priceHigh={priceHigh}&
				conditionLow={conditionLow}&conditionHigh={conditionHigh}&location={location}&
				availableDate={availableDate}&maxLoan={maxLoan}&owner={owner}';

router.param('name', (req, res, next, name) => {
	req.name = null;
	if (name.length > 0) {
		req.name = name;
	}
	next();
});

router.param('count', (req, res, next, count) => {
	req.count = 20;
	if (count.length > 0) {
		req.count = parseInt(count);
	}
	next();
});

router.param('page', (req, res, next, page) => {
	req.page = 1;
	if (page.length > 0) {
		req.page = parseInt(page);
	}
	next();
});

router.param('sort', (req, res, next, sort) => {
	req.sort = 'name';
	if (sort.length > 0) {
		req.sort = sort;
	}
	next();
});

router.param('asc', (req, res, next, asc) => {
	req.asc = true;
	if (asc == false) {
		req.asc = false;
	}
	next();
});

router.param('category', (req, res, next, category) {
	req.category = null;
	if (category.length > 0) {
		req.category = category;
	}
	next();
})

router.param('priceLow', (req, res, next, priceLow) => {
	req.priceLow = 0;
	if (priceLow.length > 0 && parseFloat(priceLow) > 0) {
		req.priceLow = parseFloat(priceLow);
	}
	next();
});

router.param('priceHigh', (req, res, next, priceHigh) => {
	req.priceHigh = null;
	if (priceHigh.length > 0) {
		req.priceHigh = (parseFloat(priceHigh) > 0 && parseFloat(priceHigh) > req.priceLow) ?
					parseFloat(priceHigh) : req.priceHigh;
	}
	next();
});

router.param('conditionLow', (req, res, next, conditionLow) => {
	req.conditionLow = 0;
	if (conditionLow.length > 0 && parseInt(conditionLow) > 0 && parseInt(conditionLow) <= 5) {
		req.conditionLow = parseInt(conditionLow);
	}
	next();
});

router.param('conditionHigh', (req, res, next, conditionHigh) => {
	req.conditionHigh = 5;
	if (conditionHigh.length > 0 && parseInt(conditionHigh) >= req.conditionLow) {
		req.conditionHigh = parseInt(conditionHigh);
	}
	next();
});

router.param('location', (req, res, next, location) => {
	req.location = null;
	if (location.length > 0) {
		req.location = location;
	}
	next();
});

router.param('availableDate', (req, res, next, available_date) => {
	req.available_date = null;
	if (available_date.length > 0) {
		req.available_date = available_date;
	}
	next();
});

router.param('maxLoan', (req, res, next, maxLoan) => {
	req.maxLoan = null;
	if (maxLoan.length > 0 && parseInt(maxLoan) > 0) {
		req.maxLoan = parseInt(maxLoan);
	}
	next();
});

router.param('owner', (req, res, next, owner) => {
	req.owner = 0;
	if (owner.length > 0) {
		req.owner = owner;
	}
	next();
});

router.param('stuffid', (req, res, next, stuffid) => {
	req.stuffid = null;
	if (stuffid.length > 0) {
		req.stuffid = stuffid;
	}
	next();
});

router.param('bidamt', (req, res, next, bidamt) => {
	req.bidamt = 0;
	if (bidamt.length > 0) {
		req.bidamt = parseFloat(bidamt);
	}
	next();
});

router.get(filterString, (req, res, next) => {
	// Filter Stuff List depending on params
	var filterList = {'name': req.name, 'count': req.count, 'page': req.page, 'sort': req.sort,
						'asc': req.asc, 'category': req.category, 'priceHigh': req.priceHigh,
						'priceLow': req.priceLow, 'conditionHigh': req.conditionHigh, 
						'conditionLow': req.conditionLow, 'location': location,
						'availableDate': availableDate, 'owner': owner};
	const response = conn.query(queries.getFilteredStuff(filterList))
	return response.then(data => res.send(data));
});

router.get('/:stuffid', (req, res, next) => {
	// Detail view for stuff with stuff id
	const response = conn.query(queries.getStuffData(req.stuffid));
	return response.then(data => res.send(data));
});

router.post('/:stuffid/bid/:bidamt', function(req, res, next) {
	// Bid for this stuff
});

router.get('/', (req, res, next) => {
	// List of all available things
	const response = conn.query(queries.allStuffData);
	return response.then(data => res.send(data));
});

// router.get('/admin', function(req, res, next) {
// 	// Admin privileges to create, update and delete all entries
// });

module.exports = router;
