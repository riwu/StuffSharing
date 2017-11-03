import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001/';

const get = path => axios.get(path).then(response => response.data);

const [post, patch, put] = ['post', 'patch', 'put'].map(method =>
  (path, payload) => axios({
    method,
    url: path,
    data: payload,
  }).catch((err) => {
    console.log('encountered error for', path, ':', (err.response || {}).data);
    throw new Error((err.response || {}).data);
  }));

export default {
  getStuffs: search => get('stuff'),
  getUsers: () => get('users'),
  getLoans: () => get('bids'),
  getBids: () => get('loans'),
  login: (username, password) => post('login', { username, password }),
  register: user => post('register', user),
};
