import React from "react";

const SearchBar = ({ handleSearch, searchQuery }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search for a movie..."
      />
    </div>
  );
};

export default SearchBar;
