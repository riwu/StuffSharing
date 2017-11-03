import { connect } from 'react-redux';
import { setFilter } from '../actions';
import Search from './Search';

const mapStateToProps = state => ({
  search: state.search,
});

export default connect(mapStateToProps, { setFilter })(Search);
