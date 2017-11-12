import React from 'react';
import Search from './SearchContainer';
import Stuffs from './StuffsSearchResult';

const HomePage = () => (
  <div>
    <Search />
    <div style={{ marginLeft: '420px' }}>
      <Stuffs />
    </div>
  </div>
);

export default HomePage;
