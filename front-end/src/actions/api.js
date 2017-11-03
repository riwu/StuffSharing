const API_BASE_URL = 'http://localhost:3001/';

const get = path => fetch(API_BASE_URL + path).then(response => response.json());

// const [post] = ['POST'].map(method =>
//   (path, payload) => fetch(API_BASE_URL + path, {
//     method,
//     body: JSON.stringify(payload),
//   }).then(response => response.json()),
// );

export default {
  getStuffs: search => get('stuff'),
  getUsers: () => get('users'),
  getLoans: () => get('bids'),
  getBids: () => get('loans'),
};
