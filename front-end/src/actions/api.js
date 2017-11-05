import axios from 'axios';

axios.defaults.baseURL = (process.env.NODE_ENV === 'development')
  ? 'https://localhost:3001/'
  : 'https://13.228.235.195:3001/';

const get = path => axios.get(path).then(response => response.data);

const [post] = ['post'].map(method =>
  (path, payload) => axios({
    method,
    url: path,
    data: payload,
  })
  .then(response => response.data)
  .catch((err) => {
    console.log('encountered error for', path, ':', 'method:', method, (err.response || {}).data, payload);
    throw new Error((err.response || {}).data);
  }));


export default {
  getStuffs: (search) => {
    console.log('search', search);
    return get(`stuff?${Object.entries(search)
      .reduce((str, [key, value]) => `${str + key}=${encodeURIComponent(value)}&`, '')}`);
  },
  getUser: username => get(`users/${username}`),
  login: (username, password) => post('login', { username, password }),
  register: user => post('register', user),
  postNew: stuff => post('users/add/stuff', stuff),
  deleteStuff: (stuffId, user) => post('users/stuff/delete', { stuffId, user }),
};
