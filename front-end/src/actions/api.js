import axios from 'axios';
import moment from 'moment';

axios.defaults.baseURL = 'http://localhost:3001/';

const get = path => axios.get(path).then(response => response.data);

const [post, patch, put] = ['post', 'patch', 'put'].map(method =>
  (path, payload) => axios({
    method,
    url: path,
    data: payload,
  }).catch((err) => {
    console.log('encountered error for', path, ':', 'method:', method, (err.response || {}).data, payload);
    throw new Error((err.response || {}).data);
  }));


export default {
  getStuffs: (search) => {
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
      location: search.location.join(),
    };

    console.log('query', query);

    return get(`stuff?${Object.entries(query)
      .filter(([key, value]) => value !== undefined && (typeof value !== 'string' || value.trim() !== ''))
      .reduce((str, [key, value]) => `${str + key}=${encodeURIComponent(value)}&`, '')}`);
  },
  getUsers: () => get('users'),
  getLoans: () => get('bids'),
  getBids: () => get('loans'),
  login: (username, password) => post('login', { username, password }),
  register: user => post('register', user),
  postNew: stuff => post('users/add/stuff', stuff),
};
