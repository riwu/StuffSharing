import axios from 'axios';
import moment from 'moment';
import { store } from '../App';

axios.defaults.baseURL = `${process.env.REACT_APP_MITYSG_URL}/`;

const get = path => axios.get(path).then(response => response.data);

const [post, del] = ['post', 'delete'].map(method =>
  (path, payload) => {
    const { username, password, id } = store.getState().user.info;
    return axios({
      method,
      url: path,
      data: { ...payload, user: { username, password, id } },
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
    const categoryMap = {
      Price: 'price',
      Condition: 'condition',
      'Max Loan': 'max_loan_period',
      'Available date': 'available_from',
    };
    const query = {
      ...Object.entries(search)
        .filter(([key, value]) => ['name', 'count', 'page',
          'sort', 'name', 'asc', 'maxLoan', 'owner'].includes(key))
        .reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {}),
      availableDate: moment(search.availableDate, 'D MMM YY').format('YYYY-MM-DD'),
      category: search.category === 'All' ? undefined : categoryMap[search.category],
      priceLow: search.price[0],
      priceHigh: search.price[1] === 100 ? Number.MAX_VALUE : search.price[1],
      conditionLow: search.condition[0],
      conditionHigh: search.condition[1],
      location: search.location.map(location => location.label).join(),
      page: 1,
    };

    console.log('query', query);

    const filteredQuery = Object.entries(query).filter(([key, value]) =>
      value !== undefined && (typeof value !== 'string' || value.trim() !== ''));

    return get(`stuff?${filteredQuery.reduce((str, [key, value]) =>
      `${str + key}=${encodeURIComponent(value)}&`, '').slice(0, -1)}`);
  },
  getUser: username => get(`users/${username}`),
  login: (username, password) => post('login', { username, password }),
  register: user => post('register', user),

  postNew: stuff => post('users/add/stuff', stuff),
  deleteStuff: stuffId => del(`stuff/${stuffId}/delete`),
  stuffReturned: stuffId => post(`stuff/${stuffId}/return`),
  updateUser: user => post('me/update', user),

  bid: (stuffId, bidAmt) => post(`stuff/${stuffId}/bid`, { bidAmt }),
  cancelBid: stuffId => post(`stuff/${stuffId}/cancelBid`),
  denyBid: (stuffId, bidder) => post(`stuff/${stuffId}/denyBid`, { bidder }),
  acceptBid: (stuffId, bidder) => post(`stuff/${stuffId}/acceptBid`, { bidder }),
};
