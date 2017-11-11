import { connect } from 'react-redux';
import { setFilter, getStuffs } from '../actions';
import Search from './Search';

const mapStateToProps = state => ({
  search: state.search,
});

export default connect(mapStateToProps, { setFilter, getStuffs })(Search);
