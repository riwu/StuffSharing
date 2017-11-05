import { connect } from 'react-redux';
import moment from 'moment';
import { setFilter, getStuffs } from '../actions';
import Search from './Search';

const mapStateToProps = state => ({
  search: state.search,
});

const mapDispatchToProps = dispatch => ({
  setFilter: (field, value) => dispatch(setFilter(field, value)),
  onSubmit: (search) => {
    dispatch(setFilter('page', 0));
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

    dispatch(getStuffs(Object.entries(query)
      .filter(([key, value]) => value !== undefined && (typeof value !== 'string' || value.trim() !== ''))
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {})));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
