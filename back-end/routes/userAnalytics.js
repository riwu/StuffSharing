function stuffBorrowed(username) {
	var stuffId = `SELECT l.stuff FROM loan_log AS l, user AS u` +
			` WHERE l.borrower=u.id AND u.username=${username}`;
	return `SELECT * FROM stuff WHERE id = ANY(${stuffId})`;
} 

function stuffLent(username) {
	var stuffId = `SELECT l.stuff` +
					` FROM loan_log AS l, user AS u, stuff AS s` +
					` WHERE s.id=l.stuff AND s.owner=u.id AND u.username=${username}`;
	return `SELECT * FROM stuff WHERE id = ANY(${stuffId})`;
}

function totalEarned(username) {
	return `SELECT SUM(l.price) FROM loan_log AS l, user AS u, stuff AS s`
			`WHERE s.id=l.stuff AND s.owner=u.id AND u.username=${username}`;
}

function monthlyEarned(username) {
	
}

function totalSpent(username) {
	return `SELECT SUM(l.price) FROM loan_log AS l, user AS u`
			`WHERE l.borrower=u.id AND u.username=${username}`;
}

function monthlySpent(username) {

}

function mostPopularStuff(username) {
	const subQuery = `SELECT COUNT(*)` +
						` FROM stuff AS s2, bid_log AS b2, user AS u2` +
						` WHERE s2.id=b2.stuff_id AND s2.owner=u2.id AND u2.username="${username}"` +
						` GROUP BY b2.stuff_id`;
	return `SELECT * FROM stuff WHERE id = ANY (` + 
			`SELECT b.stuff_id` +
			` FROM stuff AS s, bid_log AS b, user AS u` + 
			` WHERE s.id=b.stuff_id AND s.owner=u.id AND u.username=${username}` +
			` GROUP BY b.stuff_id` + 
			` HAVING COUNT(*) >= ALL(${subQuery}))`;
}

function favouriteCategory(username) {
	return `SELECT s.category` + 
			` FROM stuff AS s, bid_log AS b, user AS u` +
			` WHERE s.id=b.stuff_id AND b.user_id=u.id AND u.username=${username}` + 
			` GROUP BY s.category` + 
			` ORDER BY COUNT(*) DESC` +
			` LIMIT 1`;
}

module.exports = {
	stuffBorrowed: stuffBorrowed,
	stuffLent: stuffLent,
	totalEarned: totalEarned,
	monthlyEarned: monthlyEarned,
	totalSpent: totalSpent,
	monthlySpent: monthlySpent,
	mostPopularStuff: mostPopularStuff,
	favouriteCategory: favouriteCategory
};