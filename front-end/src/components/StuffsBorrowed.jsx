import React from 'react';
import moment from 'moment';
import Stuffs from './Stuffs';

const StuffChildren = ({ stuff }) => (
  <td>
    {moment(stuff.loan_date).format('D MMM YY')}
  </td>
);

const StuffsBorrowed = props => (
  <Stuffs
    stuffs={props.stuffs}
    extra={StuffChildren}
    extraHeaders={['Loan date']}
    showOwner
  />
);

export default StuffsBorrowed;
