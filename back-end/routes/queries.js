function getUserData(username) {
	return 'SELECT * FROM copy WHERE owner=' + username;
}

function getStuffData(stuffId) {
	return 'SELECT * FROM stuff WHERE sid=' + stuffId;
}

module.exports = {
	allSafeUserData: 'SELECT name, email, location FROM user ORDER BY name',
	allUserData: 'SELECT * FROM user',
	allStuffData: 'SELECT * FROM stuff',

	getUserData: getUserData,
	getStuffData: getStuffData,

};