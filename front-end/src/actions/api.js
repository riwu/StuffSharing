import axios from 'axios';
import { store } from '../App';

axios.defaults.baseURL = (process.env.NODE_ENV === 'development')
  ? 'http://localhost:3001/'
  : 'https://www.wangriwu.com:3001/';

const get = path => axios.get(path).then(response => response.data);

const [post] = ['post'].map(method =>
  (path, payload) => {
    const user = store.getState().user.info;
    return axios({
      method,
      url: path,
      data: { ...payload, user },
    })
    .then(response => response.data)
    .catch((err) => {
      console.log('encountered error for', path, ':', 'method:', method, (err.response || {}).data, payload);
      throw new Error((err.response || {}).data);
    });
  });


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
  deleteStuff: stuffId => post('users/stuff/delete', stuffId),
  bid: ({ bidAmt, stuffId }) => post(`stuff/${stuffId}/bid`, { bidAmt }),
};
