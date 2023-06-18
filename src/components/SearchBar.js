import React from 'react';


const SearchBar = ({ handleSearch }) => {
  return (
    <div>
      <input id="search" type="text" placeholder="Search Pokemon" onChange={handleSearch} />
    </div>
  );
};

export default SearchBar;
