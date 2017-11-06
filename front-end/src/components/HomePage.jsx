import React from 'react';
import Search from './SearchContainer';
import Stuffs from './StuffsContainer';

const HomePage = () => (
  <div>
    <Search />
    <div style={{ marginLeft: '420px' }}>
      <Stuffs />
    </div>
  </div>
);

export default HomePage;
