import React from 'react';
import Stuffs from './StuffsListed';

const StuffsSearchResult = (props) => {
  if (props.stuffs.data.length === 0) {
    return (
      <h1 className="noResult">
        No results found!
      </h1>
    );
  }
  return (
    <Stuffs {...props} />
  );
};

export default StuffsSearchResult;
