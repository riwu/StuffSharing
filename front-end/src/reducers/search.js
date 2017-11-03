import moment from 'moment';

const initialState = {
  name: '',
  count: '10',
  page: 1,

  sort: 'Price',
  asc: true,

  category: 'All',
  price: [0, 100],
  condition: [1, 5],
  location: [
    { value: 'AF', label: 'Afghanistan' },
  ],
  availableDate: moment().format('D MMM YY'),
  minLoan: 50,
  owner: '',
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return {
        ...state,
        [action.name]: action.value,
      };
    default:
      return state;
  }
};

export default search;
