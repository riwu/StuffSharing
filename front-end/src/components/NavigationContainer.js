import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Navigation from './Navigation';
import { logout } from '../actions';

const mapStateToProps = state => ({
  username: state.user.username,
});

export default connect(mapStateToProps, {
  push,
  logout,
})(Navigation);
