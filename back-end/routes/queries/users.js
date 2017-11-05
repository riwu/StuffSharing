import conn from '../connection';

function allSafeUserData() {
  var q =`SELECT username, email, first_name, last_name FROM user`;
  console.log(q);
	return q;
}

function allUserData() {
	return `SELECT * FROM user`;
}

function getUserData(username) {
  console.log('userdata');
  return `SELECT first_name, last_name, email FROM user WHERE username="${username}"`;
}

function getUserStuff(username) {
  return `SELECT * FROM stuff WHERE owner=(SELECT id FROM user WHERE username="${username}")`;
}

function updateUser(username, params) {
  return `UPDATE user SET${paramsToString(params)} WHERE username="${username}"`;
}

function deleteUser(username) {
  return `DELETE FROM user WHERE username="${username}"`;
}

function loginUser(login) {
  return conn.query('SELECT * FROM user u WHERE u.username = ? AND u.password = ?', [login.username, login.password]);
}

function checkUsername(user) {
  return conn.query('SELECT * FROM user u WHERE u.username = ? OR u.email = ?', [user.username, user.email]);
}

function checkUser(details) {
  return `SELECT * FROM user WHERE username="${details.username}" AND password="${details.password}"`;
}

function registerUser(details) {
  return conn.query('INSERT INTO user SET ?', details);
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

module.exports = {
	allSafeUserData,
	allUserData,
	getUserData,
  getUserStuff,
	updateUser,
	deleteUser,

	loginUser,
	checkUsername,
  checkUser,
	registerUser,
};