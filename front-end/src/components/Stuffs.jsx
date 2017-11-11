import React from 'react';
import Pagination from 'react-paginate';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import './Stuffs.css';

const Stuffs = props => (
  <div>
    <table className="Stuffs">
      <thead>
        <tr>
          {['Name', 'Description', 'Category', 'Price', 'Location', 'Condition',
            'Available from', 'Max loan period', props.showOwner ? 'Owner' : null].map(label => (
              <th key={label}>{label}</th>
            ))}
        </tr>
      </thead>

      <tbody>
        {props.stuffs.data.map((stuff) => {
          const path = (props.route.location || {}).pathname || '';
          return (
            <tr key={stuff.id}>
              {[stuff.name, stuff.desc, stuff.category, `$${stuff.price}`, stuff.location,
                stuff.condition, moment(stuff.available_from).format('D MMM YY'),
                `${stuff.max_loan_period} days`].map((value, index) => (
                  <td key={index}>{value}</td>
                  ))}
              {path.substring(path.lastIndexOf('/') + 1) !== stuff.username &&
                <td><Link to={`/users/${stuff.username}`}>{stuff.username}</Link></td>
              }
              {props.extra &&
              <td>
                <props.extra stuff={stuff} />
              </td>
              }
            </tr>
          );
        })}
      </tbody>
    </table>
    {props.stuffs.pages > 1 &&
      <Pagination
        onPageChange={({ selected }) => {
          props.setFilter('page', selected);
          props.getStuffs({ ...props.search, page: selected + 1 });
        }}
        pageCount={props.stuffs.pages}
        forcePage={props.search.page}
        pageRangeDisplayed={10}
        marginPagesDisplayed={1}
        breakLabel={<a href="">...</a>}
        breakClassName={'break-me'}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
      }
  </div>
  );

Stuffs.defaultProps = {
  search: { page: 1 },
};

const mapStateToProps = state => ({
  route: state.route,
});

export default connect(mapStateToProps)(Stuffs);
